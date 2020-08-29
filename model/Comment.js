const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('comment', schema);