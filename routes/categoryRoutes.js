const express=require('express');
const router=express.Router();

const categoryMgmtController=require('../controller/categoryMgmtController')
const {upload}= require("../utils/commonFunctions")



router.post('/createCategory',upload.single("icon"),categoryMgmtController.createCategory);
router.get('/getCategory/:id',categoryMgmtController.getCategory);
router.get('/getAllCategory',categoryMgmtController.getAllCategory);
router.put('/updateCategory/:id',categoryMgmtController.updateCategory);
router.delete('/deleteCategory/:id',categoryMgmtController.deleteCategory);
router.delete('/deleteAllCategory',categoryMgmtController.deleteAllCategory);
router.put('/changeStatus',categoryMgmtController.changeStatus);


module.exports=router;