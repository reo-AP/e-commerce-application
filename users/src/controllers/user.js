const userService = require('../services/user_service');

async function getUser(req, res){
    return userService.getUser(req, res);
}

async function updateUser(req, res){
    return userService.updateUser(req, res);
}
module.exports = {
    getUser,
    updateUser
}