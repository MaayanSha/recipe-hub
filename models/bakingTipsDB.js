const mongoose = require('mongoose');

const bakingTipsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
})

modules.exports = mongoose.model('BakingTips', bakingTipsSchema);