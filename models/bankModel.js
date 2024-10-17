import { Schema, model } from 'mongoose';

const bankAccountSchema = new Schema(
  {
    ifscCode: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const BankAccount = model('BankAccount', bankAccountSchema);
export default BankAccount;
