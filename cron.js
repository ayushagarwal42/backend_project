// const USER = require("./model/userModel");
// const config = require('./config/config');
// const nodemailer=require('nodemailer');
const cron =require('node-cron');
const {sendEmailsToAllUsers}=require('./controller/userController');

cron.schedule('* * * * * *',async()=>{
    console.log("Cron Job Executed: Sending Emails to All Users");
    await sendEmailsToAllUsers();
})