const {User} = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypy = require('bcrypt-promise');
const CONFIG = require('../../../common/config.json');
require('dotenv').config();


async function login(req, res){
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      res.status(CONFIG.ERRORS.USER_NOT_FOUND.code);
      res.json({status: false, message: CONFIG.ERRORS.USER_NOT_FOUND.message})
      return;
    }
    let result = await bcrypy.compare(password, existingUser.password).then(matched=>matched);
    if(!result){
        res.status(CONFIG.ERRORS.CREDS_DID_NOT_MATCH.code);
        res.json({status: false, message: CONFIG.ERRORS.CREDS_DID_NOT_MATCH.message})
    }
    let token = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        }, 
        process.env.JWT_KEY, 
        {
            expiresIn: '360d'
        });

        req.session = { jwt: token };

        let response = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        }
        res.status(200).send(response);
}

async function register(req, res){
    const { email, password, name } = req.body;
    let user = await User.findOne({where: {email: email}}); 
    console.log(user)
    if(user){
        res.status(CONFIG.ERRORS.USER_ALREADY_EXISTS.code);
        res.json({status: false, message: CONFIG.ERRORS.USER_ALREADY_EXISTS.message});
        return;
    }
    let pass = await bcrypy.hash(password, 10);
    let builtUser = User.build({
        email,
        password: pass,
        name
    });

    let createdUser = await builtUser.save().catch(err=>{
        res.status(CONFIG.ERRORS.USER_CREATION_FAILED.code);
        res.json({status: false, message: CONFIG.ERRORS.USER_CREATION_FAILED.message});
        return false;
    });
    if(!createdUser)
    return;

    let token = jwt.sign(
        {
            id: createdUser.id,
            email: createdUser.email
        }, 
        process.env.JWT_KEY, 
        {
            expiresIn: '360d'
        });
    req.session = { jwt: token };

    let response = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email
    }
    
    res.status(201).send(response);
}

async function logout(req, res){
    req.session = null;
    res.send({});
}

module.exports = {
    login,
    logout,
    register
}