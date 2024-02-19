const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const isUserLoggedIn = require('../middlewares/userLoggedIn');
const {getOrdersById, createOrder, deleteOrder, validate} = require('../middlewares/request_validators');

router.get('/', isUserLoggedIn, orderController.getOrders);
router.post('/create', createOrder, validate, isUserLoggedIn, orderController.createOrder )
router.get('/:id', getOrdersById, validate, isUserLoggedIn, orderController.getOrderById);
router.delete('/delete/:id', deleteOrder, validate, isUserLoggedIn, orderController.deleteOrder);

module.exports = router;


