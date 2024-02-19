
const {User} = require('../database/connection');
const CONFIG = require('../../../common/config.json');
const responseCreator = require('../util/response_extractor');

async function getUser(req, res){
    let id = req.params.id;
    let user = await User.findOne({where: {id:id}});
    if(!user){
        res.status(404).json({status: false, meaasge: CONFIG.ERRORS.USER_NOT_FOUND.message});
        return;
    }
    let response = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roles
    }
    res.status(200).json(response);
}

async function updateUser(req, res){
    let id = req.params.id;
    let body = req.body;
    let user = await User.findOne({where: {id:id}});
    if(!user){
        res.status(404).json(CONFIG.ERRORS.USER_NOT_FOUND.message);
        return;
    }
    if(body.name)
    user.name = body.name;

    if(body.role)
    user.roles = body.role;

    if(body.name || body.role){
        let updatedUser = await user.save();
        res.status(201).json(responseCreator(updatedUser));
    }else{
        res.status(402).json({status: false, message: "Not a valid message body"});

    }

}
module.exports = {
    getUser,
    updateUser
}