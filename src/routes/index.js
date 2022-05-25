const express = require("express");

const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { addTransaction, getTransactions, getTransaction, notification, deleteTransaction } = require("../controllers/transaction");
const { getArtis, addArtis } = require("../controllers/artis");
const { register, login, checkAuth } = require("../controllers/auth");
const { musics, addMusic } = require("../controllers/music");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Users
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);

// Music
// router menampikan data
router.get("/musics", musics);
router.post("/add-music", uploadFile("imageSong", "fileSong"), addMusic);

// Artis
router.get("/artis", getArtis);
router.post("/add-artis", addArtis); // must ad auth


// Transaction
router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

// Login & Register
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth/", auth, checkAuth);

// Notification for midrans
router.post("/notification", notification);

module.exports = router;
