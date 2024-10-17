import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/generateToken.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.static('matchPassword', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found');

  const hashPassword = user.password;

  const isMatch = await bcrypt.compare(password, hashPassword);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = createToken(user);
  return token;
});

const User = model('User', userSchema);
export default User;
