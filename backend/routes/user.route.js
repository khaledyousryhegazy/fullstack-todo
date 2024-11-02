const router = require("express").Router();

const {
  getAllUsers,
  register,
  login,
  deleteUser,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/", auth, getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.delete("/:id", deleteUser);

module.exports = router;
