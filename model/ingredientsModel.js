const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    // date: { type: Date, default: Date.now },
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: [String]
    },
    subcategory: {
        type: [String]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);