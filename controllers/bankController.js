import mongoose from 'mongoose';
import BankAccount from '../models/bankModel.js';

const addBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
    req.body;

  try {
    const bankAccount = await BankAccount.create({
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
      user: req.user._id,
    });
    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(400).json({ message: `error adding bankAccount: ${error}` });
  }
};

const getBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({
      user: req.user._id,
    }).populate('user');
    res.status(200).json({ bankAccounts });
  } catch (error) {
    console.error(`Error getting bank accounts: ${error.message}`);
    res.status(500).json({
      message: 'Error getting bank accounts. Please try again later.',
    });
  }
};

const getBankAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid bank account ID' });
    }

    const bankAccount = await BankAccount.findById(id);
    // Check if bank account exists
    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    res.status(200).json({ bankAccount });
  } catch (error) {
    console.error(`Error getting bank account:`, error);
    res
      .status(500)
      .json({ message: 'Error getting bank account, please try again' });
  }
};

const updateBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccount = await BankAccount.findByIdAndUpdate(id, req.body);
    if (!updateBankAccount) {
      res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).send(updatedAccount);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await BankAccount.findByIdAndDelete(id, req.body);
    if (!deletedAccount) {
      res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).send('Account Deleted Successful');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  addBankAccount,
  getBankAccounts,
  getBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
