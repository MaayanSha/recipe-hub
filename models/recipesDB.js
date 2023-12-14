const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema);