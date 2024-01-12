const { body }=require('express-validator');


exports.loginValidation=[
    
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        // Check if email contains the "@" symbol
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    
    body('userPassword').notEmpty().isLength({min:8}).withMessage('Password should be atleast 8 characters long'),
    
    // body('userName').optional().isLength({min:3}).withMessage('Username should be atleast 3 characters long'),

    // body('userPhone').optional().isMobilePhone().withMessage('Invalid phone number'),
]


exports.signupValidation=[
    
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        // Check if email contains the "@" symbol
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    
    body('userPassword').notEmpty().isLength({min:8}).withMessage('Password should be atleast 8 characters long'),
    
    body('userName').notEmpty().isLength({min:3}).withMessage('Username should be atleast 3 characters long'),

    body('userPhone').optional().isMobilePhone().withMessage('Invalid phone number'),
]

exports.changePasswordValidations=[
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format'),
    body('oldPassword').trim().exists().notEmpty().withMessage('current password is required'),
    body('newPassword').trim().exists().notEmpty().withMessage('new password is required')
        .isLength({ min: 6 }).withMessage('password is too short, must be of length 6'),
]

exports.getUserProfile=[
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format'),
    // body('_id').notEmpty().withMessage('Id is req'),
]

exports.updateUserProfile=[
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format'),
    body('newUserName').optional().isLength({min:3}).withMessage('Username should be atleast 3 characters long'),
    body('newUserPhone').optional().isMobilePhone().withMessage('Invalid phone number'),
]

exports.deleteUserProfile=[
    body('userEmail').notEmpty().isEmail().withMessage('Invalid email format'),
]

