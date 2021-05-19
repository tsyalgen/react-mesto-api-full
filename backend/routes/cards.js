const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');
const { validateCreateCard, validateDeleteCard, validateLike } = require('../middlewares/validators');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:id', validateDeleteCard, deleteCard);
router.put('/:id/likes', validateLike, addLike);
router.delete('/:id/likes', validateLike, deleteLike);

module.exports = router;
