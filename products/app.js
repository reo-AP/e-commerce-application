const express = require('express');
const cors = require('cors');
const mq = require('amqplib');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const ProductRouter = require('./src/routers/product');
const CuastomErrors = require('../common/errors');

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
app.use('/api/product',ProductRouter);

app.all('*', (req, res) => {
  res.status(404).send(new CuastomErrors(404, "Not Found"));
});
// process.setUncaughtExceptionCaptureCallback((err)=>{
//     console.log("err occured =====>>>", err)
// })

module.exports = app ;