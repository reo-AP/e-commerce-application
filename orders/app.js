const express = require('express');
const cors = require('cors');
const mq = require('amqplib');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const CuastomErrors = require('../common/errors');
const OrderRouter = require('./src/routers/order');

const corsOptions = {
    origin: 'http://localhost:80'
}
const app = express();
app.use(json());
app.use(cors());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
  })
);

app.use('/api/order', OrderRouter);

app.all('*', (req, res) => {
  res.status(404).send(new CuastomErrors(404, "Not Found"));
});
// process.setUncaughtExceptionCaptureCallback((req,res)=>{
//     console.log("err occured")
// })

module.exports = app ;