const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ["à lire", "en cours de lecture", "lu"],
    default: "à lire",
  },
  pages: { type: Number, required: true },
  category: { type: String, required: true },
  lastReadPage: { type: Number, default: 0 },
  image: { type: String },
});

module.exports = mongoose.model("Book", BookSchema);
