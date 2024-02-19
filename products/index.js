const app = require('./app');
const db = require('./src/database/connection');
const createMqConnectionAndListen = require('./src/events/consumers/productmessageConsumer');
const start = async () => {
  console.log("Starting up...");
  const PORT = process.env.PORT;
  try {
    await db.sequelize.sync({force: false});
    await createMqConnectionAndListen();
  }
  catch (err){
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Listenin on port ${PORT}`);
  });
};

start();