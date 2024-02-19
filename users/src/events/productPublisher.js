const RabbitMq = require('../../../common/messageBroker');
const config = require('../../../common/config.json');

const queueName = config.QUEUE_NAMES.PRODUCT_QUEUE;

export async function createProductPublisher(){
    await RabbitMq.createConnection();
    await RabbitMq.createQueue(RabbitMq.channel, queueName);
    return RabbitMq.messagePublisher(RabbitMq.channel, queueName);
}

export async function consumeProductMessages(){
    return await RabbitMq.messageConsumer(RabbitMq.channel, queueName);
}