/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');

const HandlerError = require('./errors/HandlerError');
const { PORT, DB_ADDRESS } = require('./utils');
const routes = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_ADDRESS);
app.use(requestLogger);
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
}); */
app.use(cors());
app.use('/', routes);
app.use(errors());
app.use(errorLogger);
app.use(HandlerError);
app.listen(PORT, () => { });
