const mongoose = require("mongoose");

const SauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String },
  description: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  usersLiked: ["String <userId>"],
  usersDisliked: ["String <userId>"],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Sauce", SauceSchema);
