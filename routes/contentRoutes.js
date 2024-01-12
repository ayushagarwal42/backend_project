const express=require('express');
const router=express.Router();
const contentMgmtController=require('../controller/contentMgmtController')

router.post('/createContent',contentMgmtController.createContent);
router.get('/getContent',contentMgmtController.getContent);


module.exports=router;