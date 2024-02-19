const mq = require('amqplib');
const QUEUES = require('../../../../common/config.json');
const HOST = 'amqp://localhost';
let channel = null;


class RabbitMq{
    #connection = null;
    channel = null;

    async createConnection(){
        if(this.#connection)
        return true;
        try{
            this.#connection = await mq.connect(HOST);
            this.channel = await this.#connection.createChannel();
        }catch(err){
            throw new Error("COnnection not created");
        }

        return true; 
    }

    async createQueue(channel, queueName){
        await channel.assertQueue(queueName,{durable: false});
    }

    async publishMessage(channel,queueName, message){
        await channel.sendToQueue(queueName, Buffer.from(message));
        return {status: 1}
    }

    async consumeMessage(channel,queueName,cb){
        await channel.consume(queueName, async(message)=>{
            if(message){
                await cb(message);
                channel.ack(message);
            }
        })
    }
}

module.exports =  new RabbitMq();


