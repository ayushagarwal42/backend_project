const USER = require("../model/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 1;
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const cron = require('node-cron');
const pdf = require('html-pdf');
var CryptoJS = require("crypto-js");




// Function to encrypt data using AES
function encryptData(data, secretKey) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
}

// Function to decrypt data using AES
function decryptData(ciphertext, secretKey) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.error("Error decrypting data:", error);
        throw error; // Rethrow the error to be caught in the calling function
    }

}
const secretKey = "LAUGHINGBUDDHA";

exports.generatePDF = async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail) {
            return res.status(400).json({
                code: 400,
                message: "email not provided in the request body",
            });
        }
        const findUser = await USER.findOne({ userEmail: userEmail });

        if (!findUser) {
            return res.status(404).json({
                code: 404,
                mesaage: "user not found",
            });
        }
        // generate html for the pdf
        const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>User Profile - ${findUser.userName}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: black;
                        margin: 20px;
                    }
                    h1 {
                        color: white;
                    }
                    p {
                        color: white;
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>User Profile</h1>
                <p><strong>Name:</strong> ${findUser.userName}</p>
                <p><strong>Email:</strong> ${findUser.userEmail}</p>
                <p><strong>Phone:</strong> ${findUser.userPhone}</p>
                <img src="https://smartcarrots.s3.us-east-2.amazonaws.com/1704795551631.jpeg" alt="Example Image">
            </body>
        </html>
        `;

        // PDF generation options
        const pdfOptions = { format: 'Letter' };

        //Generate PDF from HTML
        pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
            if (err) {
                console.error('error generating PDF:', err);
                return res.status(500).json({
                    code: 500,
                    message: "Error generation PDF",
                });
            }

            //Send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${findUser.userName}_profile.pdf`);
            res.send(buffer);
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: "interval server error",
        })
    }
}


exports.sendEmailsToAllUsers = () => {
    try {
        cron.schedule('*/10 * * * * *', async () => {
            const usersData = await USER.find({});
            if (usersData.length > 0) {
                var emails = [];
                usersData.map((key) => {
                    emails.push(key.userEmail);
                });
                console.log(userEmail);
                await Sendmail(userEmail, 'Testing cron job', 'cron job body');
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

// exports.sendEmailsToAllUsers=async()=>{
//     try{
//         const users=await USER.find({});
//         for(const user of users){
//             await Sendmail(user,'testing cron job','cron job body');
//         }
//     }catch(error){
//         console.error('error fetching users from the database',error.message);
//     }
// }


async function Sendmail(email, subject, text) {
    // 1. create an email transporter.
    // SMTP (Simple Mail Transfer Protocol)
    let transporter;
    let fromAddress;

    if (email.endsWith('@gmail.com')) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ayushagarwalds12@gmail.com',
                pass: 'btlmmxynwbjxtswo'
            },
        });
        fromAddress = 'ayushagarwalds12@gmail.com';

    } else if (email.endsWith('@yahoo.com')) {
        transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            secure: true,
            // port:587,
            // secure:false,
            //Nodemailer service option is deprecated we can directly specify the smtp server settings in create transport method 
            // service: 'yahoo',
            auth: {
                user: '',
                pass: 'yehyahoo@1234'
            },
        });
        fromAddress = 'yesayushagarwal@yahoo.com';
    }
    console.log(fromAddress);
    // Check if fromAddress is still undefined
    if (!fromAddress) {
        throw new Error('Unsupported email provider');
    }

    // 2. configure email content.
    const mailOptions = {
        from: fromAddress,
        to: email,
        subject: subject || 'Welcome to nodejs app',
        text: text || `this is a mail from ${fromAddress}`
    }
    console.log(mailOptions, ">>>>>>>>>>")

    // 3. send email
    try {
        const result = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully");
        return fromAddress;
    } catch (error) {
        console.log('Email send failed with error', error);
        throw error;
    }
}

exports.encrypt = async (req, res) => {

    let data = {
        "firstName": "Kartik",
        "lastName": "Singhal",
        "countryCode": "+1",
        "mobileNumber": "1111111111",
        "email": "kartik12@yopmail.com",
        "password": "Testing@123",
        "terms_Condition": false,
        "imdbLink": "",
        "url_slug": "",
        "userType": "61b0df509d05e9e75bdf4fc3",
        "business_logo": "",
        "firm_name": "",
        "invite_by": "",
        "is_reference": false,
        "deviceToken": "uselessToken"
    }



    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return res.status(200).json({
        data: ciphertext
    });


}
exports.decrypt = async (req, res) => {

    let ciphertext=req.body.payload;
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return res.status(200).json({
        data: decryptedData
    })
}


exports.signUp = async (req, res) => {
    try {

        const { userName, userPassword, userEmail, userPhone } = req.body;

        // Input validation
        if (!userName || !userPassword || !userEmail || !userPhone) {
            return res.status(400).json({
                code: 400,
                message: "Please provide all required fields: userName, userPassword, userEmail, userPhone",
            });
        }

        const findUser = await USER.findOne({ userEmail: userEmail });

        if (findUser) {
            return res.status(202).json({
                code: 202,
                message: "User already exists! Please Login",
            });
        } else {
            const genPassword = await bcrypt.hash(userPassword, saltRounds);

            const refDate = {
                userName: userName,
                userPassword: genPassword,
                userEmail: userEmail,
                userPhone: userPhone,
            };

            const encryptedUserData = encryptData(refDate, secretKey);//i added for encrypted data
            // console.log("encrypted data >>>>>>>>", encryptedUserData)
            // console.log(typeof(encryptedUserData));


            // const decUserData = decryptData(encryptedUserData, secretKey);//i added for encrypted data
            // console.log("decypted data >>>>>>>>>>>>>>",decUserData)


            const createUser = await USER.create({
                encryptedUserData
                // encryptedUserData
            });// previously refDate
            console.log("created user >>>>>>>>>>", createUser)

            if (createUser) {

                const mail = await Sendmail(userEmail, 'Welcome to Your App', 'Thank you for signing up!');
                console.log(mail, " >>>>>>>>>>>>>> this is the mail from which mail is sent")

                return res.status(200).json({
                    code: 200,
                    message: "User Created successfully",
                    data: createUser,
                });
            }

            return res.status(400).json({
                code: 400,
                message: "Unable to create user",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: err.message,
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const findUser = await USER.findOne({ userEmail: userEmail });
        const string = JSON.stringify(findUser);
        if (!findUser) {
            return res.status(400).json({
                code: 400,
                message: "This is not the valid email",
            });
        }
        const checkPassword = await bcrypt.compare(userPassword, findUser.userPassword)
        if (!checkPassword) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Password/Do forget your Password",
            });
        }
        const token = jwt.sign({ _id: findUser._id, userEmail: findUser.userEmail }, 'secret')
        return res.status(200).json({
            code: 200,
            message: "Login Successfully",
            data: string,
            token: token

        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: err.message,
        });
    }

}

exports.loginOrSignUp = async (req, res) => {
    try {
        const { userEmail, userPassword, userName, userPhone } = req.body;

        // Check if the user exists in the database
        const findUser = await USER.findOne({ userEmail: userEmail });

        if (!findUser) {
            // If the user does not exist, proceed with the signup process

            const genPassword = await bcrypt.hash(userPassword, saltRounds);

            const newUser = {
                userEmail: userEmail,
                userPassword: genPassword,
                userName: userName,
                userPhone: userPhone
            };

            const createUser = await USER.create(newUser);

            if (createUser) {
                //    const token = jwt.sign({ _id: createUser._id, userEmail: createUser.userEmail }, secretKey);

                return res.status(200).json({
                    code: 200,
                    message: "User Created Successfully",
                    data: createUser,
                    // token: token,
                });
            }

            return res.status(400).json({
                code: 400,
                message: "Unable to create user",
            });
        } else {
            // If the user exists, proceed with the login process

            const checkPassword = await bcrypt.compare(userPassword, findUser.userPassword);

            if (!checkPassword) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid Password/Did you forget your Password?",
                });
            }

            const token = jwt.sign({ _id: findUser._id, userEmail: findUser.userEmail }, "secretKey");

            return res.status(200).json({
                code: 200,
                message: "Login Successfully",
                data: findUser,
                token: token,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: err.message,
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { userEmail, oldPassword, newPassword } = req.body;
        // const changepass = await USER.updateOne({ userPassword: userPassword});
        const findUser = await USER.findOne({ userEmail: userEmail });

        if (!findUser) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
            });
        }

        const checkPassword = await bcrypt.compare(oldPassword, findUser.userPassword);

        if (!checkPassword) {
            return res.status(400).json({
                code: 400,
                message: "Invalid old password",
            });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // findUser.userPassword = newHashedPassword;
        // await findUser.save();

        // Update the user's password in the database
        await USER.updateOne({ userEmail: userEmail }, { $set: { userPassword: newHashedPassword } });

        return res.status(200).json({
            code: 200,
            message: "Password changed successfully",
        });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: err.message,
        });
    }
}

exports.getUserProfile = async (req, res) => {

    try {
        const { encryptedUserData } = req.body;

        if (!encryptedUserData) {

            return res.status(400).json({
                code: 400,
                message: "encryptedUserData not provided in the request body",
            });
        }
        // Find the user in the database using the provided email
        // const findUser = await USER.findOne({ userEmail: userEmail })

        // if (!findUser) {
        //     console.log("user not found");
        //     return res.status(404).json({
        //         code: 404,
        //         message: "User not found",
        //     });
        // }
        // Return the user's profile information

        try {
            // Decrypt user data
            const decryptedUserData = decryptData(encryptedUserData, secretKey);

            return res.status(200).json({
                code: 200,
                message: "Profile fetched successfully",
                data: {
                    userName: decryptedUserData.userName,//findUser.userName
                    userEmail: decryptedUserData.userEmail,
                    userPhone: decryptedUserData.userPhone,
                    // Add other profile fields as needed
                },
            });
        } catch (error) {
            console.error("Error decrypting user data:", error);
            return res.status(500).json({
                code: 500,
                message: "Error decrypting user data",
                errorDetails: error.message,
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const { userEmail, newUserName, newUserPhone } = req.body;

        if (!userEmail) {

            return res.status(400).json({
                code: 400,
                message: "Email not provided in the request body",
            });
        }
        // Find the user in the database using the provided email
        const findUser = await USER.findOne({ userEmail: userEmail })

        if (!findUser) {

            return res.status(404).json({
                code: 404,
                message: "User not found",
            });
        }

        // update user details
        await USER.updateOne(
            { userEmail: userEmail },
            {
                $set: {
                    userName: newUserName,
                    userPhone: newUserPhone,
                    // userEmail: newUserEmail,
                },
            }
        );
        // Fetch the updated user from the database
        const updatedUser = await USER.findOne({ userEmail: userEmail });

        // Return the updated user's profile information
        return res.status(200).json({
            code: 200,
            message: "Profile updated successfully",
            data: {
                userName: updatedUser.userName,
                userPhone: updatedUser.userPhone,
                userEmail: updatedUser.userEmail,
                // Add other profile fields as needed
            },
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
}

exports.deleteUserProfile = async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail) {
            return res.status(400).json({
                code: 400,
                message: "Email not provided in the request body",
            });
        }

        // Find the user in the database using the provided email
        const findUser = await USER.findOne({ userEmail: userEmail });

        if (!findUser) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
            });
        }

        // Delete the user from the database
        await USER.deleteOne({ userEmail: userEmail });

        // Return a success message
        return res.status(200).json({
            code: 200,
            message: "Profile deleted successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
};


