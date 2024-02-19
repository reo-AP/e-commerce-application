const RabbitMq = require('../RabbitMq/messageBroker');
const config = require('../../../../common/config.json');
const {Product} = require('../../database/connection');

const queueName = config.QUEUE_NAMES.PRODUCT_QUEUE;

async function createConnectionAndConsumeMessage(){
    await RabbitMq.createConnection();
    await RabbitMq.createQueue(RabbitMq.channel, queueName);
    await RabbitMq.consumeMessage(RabbitMq.channel, queueName, onCunsumption);
}

async function onCunsumption(message){
    message = message.content.toString();
    message = JSON.parse(message);
    if(message.type == 'deleted'){
        await Product.increment('stock',{by: message.quantity , where:{id: message.productId}});
    }
}

module.exports = createConnectionAndConsumeMessage;



