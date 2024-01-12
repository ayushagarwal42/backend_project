const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryMgmtModel',
        required: true,
    },
    name: {
        type: String,
    },
    icon: {
        type: String,
        default: null
    },
    description: {
        type: String
    },
    link:{
        type:String,
    },
    status:{
        type:Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('storeSchema', storeSchema);