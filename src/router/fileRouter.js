const express = require("express");
const files = require("../controller/files");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", [auth()], files.store);
router.post("/uploads", [auth()], files.upload);
router.delete("/delete/:id", [auth()], files.delete);
router.get("/onetomany", [auth()], files.oneToMany);

module.exports = router;
