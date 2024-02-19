const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const isUserLoggedIn = require('../middlewares/userLoggedIn');
const {getProductByIdValidator, getOwnProductsValidator, createProductValidator, updateProductValidator, deleteProductValidator, validate} = require('../middlewares/request_validators');

router.get('/', productController.getProducts);
router.get('/:id', getProductByIdValidator, validate, productController.getProductById);
router.get('/user/:userId', getOwnProductsValidator, validate, isUserLoggedIn, productController.getOwnProducts);
router.post('/create', createProductValidator, validate, isUserLoggedIn, productController.createProduct);
router.put('/update/:id', updateProductValidator, validate, isUserLoggedIn, productController.updateProduct);
router.delete('/delete/:id', deleteProductValidator, validate, isUserLoggedIn, productController.deleteProduct);

module.exports = router;


