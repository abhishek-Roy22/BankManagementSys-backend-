import 'dotenv/config';
import jwt from 'jsonwebtoken';

const securityKey = process.env.SECURITYKEY || 'abhishek1234roy56kumar';

const createToken = (user) => {
  const payload = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, securityKey);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, securityKey);
  return payload;
};

export { createToken, verifyToken };
