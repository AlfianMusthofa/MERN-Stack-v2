import express from 'express'
import { getData, getDataById, saveData, updateData, deleteData } from '../controllers/productController.js';

const router = express.Router()

router.get('/product', getData);
router.get('/product/:id', getDataById);
router.post('/product', saveData);
router.patch('/product/:id', updateData);
router.delete('/product/:id', deleteData);

export default router;