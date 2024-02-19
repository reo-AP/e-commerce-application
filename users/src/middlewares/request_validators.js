const {body, param, validationResult} = require('express-validator')

const loginValidator = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').trim().isLength({min: 6, max: 20}),
]

const registerValidator = [
  body('name', 'name does not Empty').not().isEmpty(),  
  body('email', 'Invalid email').isEmail(),
  body('password', 'password does not Empty').not().isEmpty(),
  body('password', 'Password must be between 6 and 20.').trim().isLength({min: 6, max: 20})
]

const getUserValidator = [
  param('id').exists().toInt()
]

const updateUserValidator = [
  param('id').exists().toInt(),
  body('role', 'Role must be between 1 and 3.').optional().toInt().isIn([1, 2, 3]),
  body('name', 'name does not Empty').not().isEmpty().isString().optional(),  
]

function validate(req, res, next) {
    const errors = validationResult(req, { locations: ['body'], includeOptionals: true, allowUnknownBody: false, stripUnknown: true });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    loginValidator,
    registerValidator,
    getUserValidator,
    updateUserValidator,
    validate
}