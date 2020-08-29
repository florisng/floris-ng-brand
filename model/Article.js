const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('article', schema);