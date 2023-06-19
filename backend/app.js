/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
/* const { PORT, DB_ADDRESS } = require('./utils'); */

const HandlerError = require('./errors/HandlerError');

const { PORT, DB_ADDRESS } = process.env;
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
app.use(cors());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', routes);
app.use(errors());
app.use(errorLogger);
app.use(HandlerError);
app.listen(PORT, () => { });
