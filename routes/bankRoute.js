import { Router } from 'express';
import {
  addBankAccount,
  deleteBankAccount,
  getBankAccounts,
  updateBankAccount,
} from '../controllers/bankController.js';

const bankRoute = Router();

bankRoute.get('/', getBankAccounts);
bankRoute.post('/addAccount', addBankAccount);
bankRoute.put('/update', updateBankAccount);
bankRoute.delete('/delete', deleteBankAccount);

export default bankRoute;
