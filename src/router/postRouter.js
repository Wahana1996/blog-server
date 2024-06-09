const express = require("express");
const postController = require("../controller/postController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create/:categoryId", [auth()], postController.store);
router.get("/showall", [auth()], postController.showAll);
router.get("/get-by-slug/:slug", [auth()], postController.getBySlug);
router.get("/:id", [auth()], postController.getById);
router.put("/:id", [auth()], postController.updatePost);
router.delete("/:id", [auth()], postController.deletePost);

module.exports = router;
