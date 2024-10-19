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
bankRoute.get('/:id', getBankAccount);
bankRoute.post('/addAccount', addBankAccount);
bankRoute.put('/:id', updateBankAccount);
bankRoute.delete('/:id', deleteBankAccount);

export default bankRoute;
