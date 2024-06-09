const express = require("express");
const postCategoriesController = require("../controller/postCategoriesController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", [auth()], postCategoriesController.store);

module.exports = router;
