import express from 'express';
import { findOrCreateCustomer } from '../controllers/customerController.js';
import { getCustomerOrders } from '../controllers/customerController.js';
const router = express.Router();

router.post('/find-or-create', findOrCreateCustomer);
router.get('/:customerId/orders', getCustomerOrders);

export default router;
