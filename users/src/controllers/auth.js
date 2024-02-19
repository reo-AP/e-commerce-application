const authSetvice = require('../services/auth_service');

async function register(req,res){
    let result = await authSetvice.register(req,res);
    return;
}

async function login(req, res){
    let result = await authSetvice.login(req, res);
    return;
}

async function logout(req, res){
    let result = await authSetvice.logout(req, res);
    return result;
}

module.exports = {register, login, logout};