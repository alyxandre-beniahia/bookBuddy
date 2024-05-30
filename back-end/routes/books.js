const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");

// @route  POST api/books
// @desc   Add a book
router.post("/addBook", auth, bookController.addBook);

// @route  GET api/books
// @desc   Get all books
router.get("/books", bookController.getBooks);

// @route  GET api/books/:id
// @desc   Get book by ID
router.get("/book/:id", bookController.getBookById);

// @route  PUT api/books/:id
// @desc   Update book status
router.put("/book/:id", bookController.updateBookStatus);

// @route  PUT api/books/status/:id
// @desc   Update last read page
router.put("/book/lrp/:id", auth, bookController.updateLastReadPage);

// @route  POST api/books/favorite/:id
// @desc   Add book to favorites
router.post("/book/favorite/:id", bookController.addToFavorites);

// @route  DELETE api/books/favorite/:id
// @desc   Remove book from favorites
router.delete("/book/favorite/:id", bookController.removeFromFavorites);

module.exports = router;
