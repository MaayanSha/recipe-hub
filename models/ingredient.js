const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gram_to_cup: {
        type: Number,
        required: true
    },
})

modules.exports = mongoose.model('Ingredient', ingredientSchema);