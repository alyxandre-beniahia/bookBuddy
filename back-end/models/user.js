const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 30,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i],
    lowercase: true,
  },
  password: { type: String, required: true },
  favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("User", UserSchema);
