const mq = require('amqplib');
const QUEUES = require('../../../../common/config.json');
require('dotenv').config();

const HOST = process.env.AMQP_HOST;

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
            console.log(err)
            throw new Error("COnnection not created");
        }

        return true; 
    }

    async createQueue(channel, queueName){
        await channel.assertQueue(queueName,{durable: false});
    }

    async publishMessage(channel, queueName, message){
        await channel.sendToQueue(queueName, Buffer.from(message));
        return {status: 1}
        }

    async messageConsumer(channel,queueName,cb){
        await channel.consume(queueName, async(message)=>{
            if(message){
                await cb();
                channel.ack(message);
            }
        })
    }
}

module.exports =  new RabbitMq();


