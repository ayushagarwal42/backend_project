const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    userPassword:{
        type:String
    },
    userEmail:{
        type:String
    },
    userPhone:{
        type:String
    },
    encryptedUserData: {
        type: String // Assuming the encrypted data is a string; adjust the type accordingly
    }
},{
    timestamps:true
});

module.exports=mongoose.model('users',userSchema);