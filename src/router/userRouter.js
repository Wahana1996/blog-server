const express = require("express");
const userController = require("../controller/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);
router.get("/showall", userController.showAll);
router.get("/showone/:id", [auth()], userController.showOne);
router.put("/update/:id", [auth()], userController.update);
router.delete("/delete/:id", [auth()], userController.delete);
router.get("/onetomany", [auth()], userController.oneToMany);

module.exports = router;
