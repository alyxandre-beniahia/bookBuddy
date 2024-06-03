const Book = require("../models/book");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Use the correct path for the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ajouter un livre
exports.addBook = [
  upload.single("image"), // Middleware to handle file upload
  async (req, res) => {
    const { title, author, status, pages, category } = req.body;
    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const image = req.file.filename;

    try {
      const newBook = new Book({
        title,
        author,
        status,
        pages,
        category,
        image,
      });
      await newBook.save();
      res.status(200).json(newBook);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  },
];

// Récupérer tous les livres
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer un livre spécifique
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Livre non trouvé" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Livre non trouvé" });
    }
    res.status(500).send("Erreur serveur");
  }
};

// Modifier l'état d'un livre
exports.updateBookStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Livre non trouvé" });
    }

    book.status = status;

    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour la dernière page lue
exports.updateLastReadPage = async (req, res) => {
  const { lastReadPage } = req.body;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Livre non trouvé" });
    }

    book.lastReadPage = lastReadPage;

    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Ajouter un livre aux favoris
exports.addToFavorites = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    user.favoriteBooks.push(req.params.id);

    await user.save();

    res.json(user.favoriteBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer un livre des favoris
exports.removeFromFavorites = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    user.favoriteBooks = user.favoriteBooks.filter(
      (bookId) => bookId.toString() !== req.params.id
    );

    await user.save();

    res.json(user.favoriteBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
