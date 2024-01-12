const express = require('express');
const router = express.Router()
const validations = require('../validations/userValidation')
const validationsResponse = require('../middlewares/validResponse');
const middlewares = require('../middlewares/userMiddleware')
const userController = require("../controller/userController");


router.post('/decrypt',userController.decrypt);
router.post('/encrypt',userController.encrypt);
router.get('/generatePDF',userController.generatePDF);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/signUp', validations.signupValidation, validationsResponse.validBodyResponse, userController.signUp);
router.post('/login', validations.loginValidation, validationsResponse.validBodyResponse, userController.login);
// router.post('/loginOrSignUp',userController.loginOrSignUp);
router.put('/changePassword', middlewares.validatedToken, validations.changePasswordValidations, validationsResponse.validBodyResponse, userController.changePassword);
// router.get('/getUserProfile', middlewares.validatedToken, validations.getUserProfile, validationsResponse.validBodyResponse, userController.getUserProfile);
router.get('/getUserProfile', middlewares.validatedToken,validationsResponse.validBodyResponse, userController.getUserProfile);
router.put('/updateUserProfile', middlewares.validatedToken, validations.updateUserProfile, validationsResponse.validBodyResponse, userController.updateUserProfile);
router.delete('/deleteUserProfile', middlewares.validatedToken, validations.deleteUserProfile, validationsResponse.validBodyResponse, userController.deleteUserProfile);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



module.exports = router;