const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { /* regId, */ regLink } = require('../utils');

router.get('/', getAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    /* cardId: Joi.string().required().pattern(regId), */
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regLink),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    /* cardId: Joi.string().required().pattern(regId), */
    cardId: Joi.string().required().hex().length(24),

  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    /* cardId: Joi.string().required().pattern(regId), */
    cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);
module.exports = router;
