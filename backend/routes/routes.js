const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const mainRouter = require('./main');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { regAvatarLink, regEmail, regPassword } = require('../utils');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regAvatarLink),
    email: Joi.string().required().pattern(regEmail),
    password: Joi.string().required().pattern(regPassword),
  }),
}), createUser);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(regEmail),
      password: Joi.string().required().pattern(regPassword),
    }),
  }),
  login,
);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', mainRouter);

module.exports = router;
