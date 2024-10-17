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
    const bankAccounts = await BankAccount.find({ user: req.user._id });
    res.status(200).json(bankAccounts);
  } catch (error) {
    res.status(400).send({ message: `Error fetching bankAccounts: ${error}` });
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
  updateBankAccount,
  deleteBankAccount,
};
