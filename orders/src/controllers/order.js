const orderService = require('../services/order_service');

async function createOrder(req,res){
    let result = await orderService.createOrder(req,res);
    return;
}

async function getOrders(req, res){
    let result = await orderService.getOrders(req, res);
    return;
}

async function getOrderById(req, res){
    let result = await orderService.getOrderById(req, res);
    return;
}

async function deleteOrder(req, res){
    let result = await orderService.deleteOrder(req, res);
    return result;
}

module.exports = {createOrder, deleteOrder, getOrderById, getOrders};