const {User,Product,Transaction, Invoice, sequelize} = require('../database/connection');
const mq = require('../events/RabbitMq/messageBroker');
const CONFIG = require('../../../common/config.json');



async function createOrder(req,res){
    let userId = req.user.id;
    let {productId, quantity} = req.body;
    
    if(!productId || !quantity)
    {
        res.status(402).json({status: false, message:"bad request must provide productId and quantity"});
        return;
    }

    let product = await Product.findOne({where: {id: productId}});
    
    if(product.stock - quantity < 0){
        res.status(409).json({status:false, message: `Requested quantity of product is not available, quantity available is ${product.stock}`});
        return;
    }
    const trans = await sequelize.transaction();
    try{
        let total = product.price * quantity;
        let invoiceInput = {
            userId: userId,
            total: total
        }
        let createdInvoice = await Invoice.create(invoiceInput,{ transaction: trans }).catch(err=>{
            throw new Error("invoice");
        });

        let transactionInput = {
            productId: productId,
            quantity: quantity,
            cancled: 0,
            invoiceId: createdInvoice.id
        }
        let createdTransaction = await Transaction.create(transactionInput, { transaction: trans }).catch(err=>{
            throw new Error("transaction");
        });
        product.stock = product.stock - quantity;
        await product.save({ transaction: trans});
        // const message = {
        //     type: "created",
        //     productId: productId,
        //     quantity: quantity
        // }
        // await mq.publishMessage(mq.channel, CONFIG.QUEUE_NAMES.PRODUCT_QUEUE, Buffer.from(message.toString()));
        await trans.commit();
        res.status(201).json(createdTransaction);
        return
    }catch(err){
        await trans.rollback();
        res.status(500).json({status: false, message: "Invoice creation or transaction creation failed"})
        return;
    }

}

async function getOrders(req, res){
    let userId = req.user.id;
    let query = {
        where:{
            userId: userId
        },
        include:[
            {
                model: Transaction
            }
        ]
    }
    let orders = await Invoice.findAll(query);
    res.status(200).json(orders);
}

async function getOrderById(req, res){
    let orderId = req.params.id;
    let query = {
        where:{
            id: orderId
        },
        include:[
            {
                model: Transaction
            }
        ]
    }
    let order = await Invoice.findOne(query);
    res.status(200).json(order);
}

async function deleteOrder(req, res){
    let transactionId = req.params.id;
    let userId = req.user.id;
    let query = {
        where: {
            userId: userId
        },
        include: [
            {
                model: Transaction,
                where:{
                  id: transactionId,
                },
                required: true
            }
        ]
    }
    let transaction = await Invoice.findOne(query);
    if(!transaction){
        res.status(404).json({status: false, message: "Order not found"});
        return;
    }
    else{
        let deleted = await Transaction.update({
            cancled: 1, 
        },
        {
            where: {
                id: transactionId,
                cancled: 0
            }
        });
        if(deleted[0]){
            let message = {
                type: "deleted",
                productId: transaction.Transactions[0].productId,
                quantity: transaction.Transactions[0].quantity
            }
            let m = JSON.stringify(message);
            await mq.publishMessage(mq.channel, CONFIG.QUEUE_NAMES.PRODUCT_QUEUE,m);
        }
        res.status(200).json({})
    }


}

module.exports = {createOrder, deleteOrder, getOrderById, getOrders};