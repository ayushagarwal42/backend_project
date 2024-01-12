const express=require('express');
const router=express.Router();

const storeMgmtController=require('../controller/storeMgmtController')
const {upload}= require("../utils/commonFunctions")



router.post('/createStore',upload.single("icon"),storeMgmtController.createStore);
router.get('/getStoreById/:id',storeMgmtController.getStoreById);
router.put('/updateStore/:id',storeMgmtController.updateStore);
router.delete('/deleteStore/:id',storeMgmtController.deleteStore);



module.exports=router;