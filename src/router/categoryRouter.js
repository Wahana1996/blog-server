const express = require("express");
const categoryController = require("../controller/categoryController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", [auth()], categoryController.store);
router.get("/showall", [auth()], categoryController.showAll);
router.get("/:id", [auth()], categoryController.getById);
router.put("/:id", [auth()], categoryController.updateCategory);
router.delete("/:id", [auth()], categoryController.deleteCategory);

module.exports = router;
