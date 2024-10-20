import { Router } from 'express';
import {
  addBankAccount,
  deleteBankAccount,
  getBankAccount,
  getBankAccounts,
  updateBankAccount,
} from '../controllers/bankController.js';

const bankRoute = Router();

bankRoute.get('/', getBankAccounts);
bankRoute.post('/addAccount', addBankAccount);
bankRoute.get('/:id', getBankAccount);
bankRoute.put('/:id', updateBankAccount);
bankRoute.delete('/:id', deleteBankAccount);

export default bankRoute;
