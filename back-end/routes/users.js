const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route  POST api/users
// @desc   Register user
router.post("/register", userController.registerUser);

// @route  POST api/users/login
// @desc   Authenticate user & get token
router.post("/login", userController.loginUser);

// @route  GET api/users/:id
// @desc   Get user by ID
router.get("/me", auth, userController.getUser);

// @route  PUT api/users/:id
// @desc   Update user password
router.put("/me", auth, userController.updateUser);

router.delete("/me", auth, userController.deleteUser);


module.exports = router;
