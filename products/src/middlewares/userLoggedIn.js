const jwt = require('jsonwebtoken');
const CONFIG = require('../../../common/config.json');
require('dotenv').config();
function isUserLoggedIn(req, res, next){
    let token = req.session?.jwt || null;
    if(!token){
        res.status(401).json({status: false, message: CONFIG.ERRORS.UNAUTHORIZED_REQUEST.message})
        return;
    }
    console.log(token)
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
      } catch (error) {
        decoded = { success: false, error: error.message };        console.log(decoded)
        res.status(403).json({status: false, message: CONFIG.ERRORS.UNAUTHORIZED_REQUEST.message})
        return;
      }
    req.user=decoded;
    next();  
}

module.exports = isUserLoggedIn;