const {Router} = require('express');
const {
    chatsGetReportChat,
    chatsGetUserChats,
    chatsGetChat,
    chatsPost,
    chatsDeleteById
    } = require('../controllers/chat');

const router = Router();

router.get('/reportChat/:idR', chatsGetReportChat); 

router.get('/userChats/:idP', chatsGetUserChats); 

router.get('/chat/:idC', chatsGetChat);
  
router.post('/', chatsPost);

router.delete('/:idP', chatsDeleteById);  

module.exports = router;