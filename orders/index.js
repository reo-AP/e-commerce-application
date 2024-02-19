const app = require('./app');
const db = require('./src/database/connection');
const productPublisher = require('./src/events/publishers/productPublisher');
require('dotenv').config();

const start = async () => {
  console.log("Starting up...");
  const PORT = process.env.PORT;

  try {
    await db.sequelize.sync({force: false});
    await productPublisher();
  }
  catch (err){
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Listenin on port ${PORT}`);
  });
};

start();