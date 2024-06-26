const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route  POST api/users
// @desc   Register user
router.post("/addUser", userController.registerUser);

// @route  POST api/users/login
// @desc   Authenticate user & get token
router.post("/connexion", userController.loginUser);

// @route  GET api/users/:id
// @desc   Get user by ID
router.get("/:id", auth, userController.getUser);

// @route  PUT api/users/:id
// @desc   Update user password
router.put("/:id", auth, userController.updatePassword);

router.delete("/:id", auth, userController.deleteUser);

// @route  POST /user
// @route   POST /fake-user
router.post('/users', userController.createUser);
router.post('/fake-user', userController.createFakeUser);
router.post('/fake-users', userController.createMultipleFakeUsers);

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = router;
