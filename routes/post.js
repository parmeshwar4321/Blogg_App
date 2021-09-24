var express = require('express');
var router = express.Router();
const controller=require('../controller/post')
const {authenticateToken}=require('../Auth/jwt')


router.get('/getPost',authenticateToken,controller.getPost)//auth
router.post('/createPost',authenticateToken,controller.creatPost)
router.put('/updatePost',authenticateToken,controller.updatePost)//auth
router.delete('/deletePost',authenticateToken,controller.deletePost)//auth


module.exports = router;
