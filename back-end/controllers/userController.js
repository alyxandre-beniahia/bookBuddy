const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Inscription utilisateur
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Utilisateur déjà enregistré" });
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
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Connexion utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Identifiants invalides" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Identifiants invalides" });
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
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// Mettre à jour le mot de passe utilisateur
exports.updatePassword = async (req, res) => {
  const { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.user.id, { password: newPassword });

    res.json({ msg: "Mot de passe mis à jour" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    if (user.id !== req.user.id) {
      return res.status(401).json({ msg: "Autorisation refusée" });
    }

    await user.remove();

    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// controllers/userController.js
const User = require('../models/user');
const { faker } = require('@faker-js/faker');

exports.createFakeUser = async (req, res) => {
  try {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const email = faker.internet.email();

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: 'Fake user created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating fake user', error });
  }
};

