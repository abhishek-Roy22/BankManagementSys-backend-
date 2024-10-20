import { Router } from 'express';
import { login, logout, register } from '../controllers/userController.js';
import { verifyAdmin } from '../middleware/auth.js';
import BankAccount from '../models/bankModel.js';

const userRoute = Router();

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.get('/logout', logout);

// Route for admins to get all users' bank account information
userRoute.get(
  '/admin/bank-accounts',
  verifyAdmin('token'),
  async (req, res) => {
    try {
      // Fetch all bank accounts and populate the related user info
      const bankAccounts = await BankAccount.find().populate('user');
      res.status(200).json({ bankAccounts });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Server error: Could not retrieve bank accounts' });
    }
  }
);

export default userRoute;
