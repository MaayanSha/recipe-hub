const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    ingredients:  [{
        index : Number,
        quantity : Number
    }],
    steps: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema, "recipes");