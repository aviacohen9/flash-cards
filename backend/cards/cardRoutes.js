const { Router } = require('express');
const  cardController = require('../cards/cardController');
const  requireAuth = require('../auth/requireAuth');



const router = Router()

// require auth for all car  d routes
router.use(requireAuth)

router.get('/', cardController.getAllCards)
router.post('/addCard', cardController.addCard)
router.get('/:card_id', cardController.getCard)
router.patch('/editcard/:card_id', cardController.editCard)                    //router.patch('/:card_id', cardController.editCard)
router.delete('/:card_id', cardController.deleteCard)

module.exports = router;