const {Router} = require('express');
const {
    chatsGetChatParticipants,
    chatsAddParticipant,
    chatsDeleteParticipant,
    chatsDeleteAllParticipants
    } = require('../controllers/participantes');

const router = Router();

router.get('/:idC', chatsGetChatParticipants);

router.post('/addParticipant/', chatsAddParticipant);

router.delete('/deleteParticipant/', chatsDeleteParticipant); 

router.delete('/deleteAllParticipants/:idC', chatsDeleteAllParticipants);

module.exports = router;