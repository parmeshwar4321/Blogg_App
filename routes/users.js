var express = require('express');
var router = express.Router();
const controller=require('../controller/user')
const {authenticateToken}=require('../Auth/jwt')

router.get('/get',authenticateToken,controller.getUsers)//auth
router.post('/signUp',controller.createUsers)
router.post('/login',controller.loginUsers)
router.put('/update',authenticateToken,controller.updateUsers)//auth
router.delete('/delete/:id',authenticateToken,controller.deleteUsers)//auth


module.exports = router;
