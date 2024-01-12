const mongoose=require('mongoose');

const contentSchema=new mongoose.Schema({
    privacyPolicy:{
        type:String,
    },
    termsAndCondition:{
        type:String,
    },
    aboutUs:{
        type:String,
    },
    ourServices:{
        type:String,
    }
},{
    timestamps:true
})

exports.contentModel=mongoose.model('content',contentSchema);