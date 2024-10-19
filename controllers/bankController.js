import BankAccount from '../models/bankModel.js';

const addBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
    req.body;

  if (
    !ifscCode ||
    !branchName ||
    !bankName ||
    !accountNumber ||
    !accountHolderName
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the account already exists for the user
    const existingAccount = await BankAccount.findOne({
      accountNumber,
      user: req.user._id,
    });

    if (existingAccount) {
      return res
        .status(400)
        .json({ message: 'Account already exists for this user' });
    }

    const bankAccount = await BankAccount.create({
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ message: 'Bank account added successfully', bankAccount });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `error adding bankAccount: ${error}` });
  }
};

const getBankAccounts = async (req, res) => {
  try {
    // Check if req.user exists and has an _id
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }
    const bankAccounts = await BankAccount.find({
      user: req.user._id,
    }).populate('user');
    res.status(200).json({ bankAccounts });
  } catch (error) {
    console.error(`Error adding bank account: ${error.message}`);
    res
      .status(500)
      .json({ message: 'Error getting bank account. Please try again later.' });
  }
};

const getBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const bankAccount = await BankAccount.findById(id);
    res.status(200).json({ bankAccount });
  } catch (error) {
    // console.log(error.message)
    res.status(500).send({ message: error.message });
  }
};

const updateBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccount = await BankAccount.findByIdAndUpdate(id, req.body);
    if (!updateBankAccount) {
      res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ updatedAccount });
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
