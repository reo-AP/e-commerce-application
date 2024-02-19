const RabbitMq = require('../RabbitMq/messageBroker');
const config = require('../../../../common/config.json');

const queueName = config.QUEUE_NAMES.PRODUCT_QUEUE;

async function createProductPublisher(){
    await RabbitMq.createConnection();
    await RabbitMq.createQueue(RabbitMq.channel, queueName);
}
module.exports = createProductPublisher;


