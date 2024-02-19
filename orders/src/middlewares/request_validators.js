const {body, param, validationResult} = require('express-validator')

const getOrdersById = [
  param('id', "order id is requred").exists().toInt()
]

const createOrder = [
  body('productId', 'product id is required').not().isEmpty().toInt(),
  body('quantity', 'product quantity is required').not().isEmpty().toInt()
]

const deleteOrder = [
  param('id', 'order id is required').exists().toInt(),
]

function validate(req, res, next) {
    const errors = validationResult(req, { locations: ['body'], includeOptionals: true, allowUnknownBody: false, stripUnknown: true });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    getOrdersById, 
    createOrder, 
    deleteOrder,
    validate
}