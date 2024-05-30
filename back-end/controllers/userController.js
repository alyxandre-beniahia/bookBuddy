const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Inscription utilisateur
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name)

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("Email déjà utilisé");
    }

    user = await User.findOne({ name });
    if (user) {
      return res.status(400).json("Nom déjà utilisé");
    }
    if (password.length <= 5) {
      return res.status(400).json("Mot de passe trop court");
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Connexion utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Identifiant incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Identifiant incorrect" });
    }

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Récupérer les informations utilisateur
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour le mot de passe utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, newPassword, favoriteBooks, id } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe incorrect" });
    }

    user.name = name;
    user.email = email;
    user.favoriteBooks = favoriteBooks;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedpassword;

    await user.save();

    res.json({ msg: "Profil mis à jour" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer un utilisateur

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
