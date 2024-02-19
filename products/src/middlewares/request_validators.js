const {body, param, query, validationResult} = require('express-validator')

const getProductByIdValidator = [
  param('id', 'please provide a product id').exists().toInt()
]

const getOwnProductsValidator = [
  param('userId', 'please provide a user id').exists().toInt()
]

const createProductValidator = [
  body('name', 'name is required').not().isEmpty().isString(),  
  body('catagory', 'catagory is required').not().isEmpty().isString(),  
  body('stock', 'stock is required').not().isEmpty().toInt(),
  body('price', 'price is required').not().isEmpty().toInt()
]

const updateProductValidator = [
  body('name', 'name is required').optional().not().isEmpty().isString(),  
  body('catagory', 'catagory is required').optional().not().isEmpty().isString(),  
  body('stock', 'stock is required').optional().not().isEmpty().toInt(),
  body('price', 'price is required').optional().not().isEmpty().toInt(),
]

const deleteProductValidator = [
  param('id', 'please provide a product id').exists().toInt()
]

function validate(req, res, next) {
    const errors = validationResult(req, { locations: ['body'], includeOptionals: true, allowUnknownBody: false, stripUnknown: true });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    getProductByIdValidator, 
    getOwnProductsValidator, 
    createProductValidator, 
    updateProductValidator, 
    deleteProductValidator,
    validate
}