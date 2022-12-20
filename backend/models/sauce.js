const mongoose = require('mongoose');

const SauceSchema = new mongoose.Schema({
    userId: { type: String},
    name: { type: String, required: true},
    manufacturer: { type: String},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String},
    heat: { type: Number, required: true},
    likes: { type: Number},
    dislikes: { type: Number},
    usersLiked: { type: Array},
    usersDisliked: { type: Array},
});

module.exports = mongoose.model('Sauce', SauceSchema);