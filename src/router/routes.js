const express = require("express");
const router = express.Router();

const fileRouter = require("./fileRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const categoryRouter = require("./categoryRouter");
const postCategoriesRouter = require("./postCategoriesRouter");

router.use("/files", fileRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/category", categoryRouter);
router.use("/postcategory", postCategoriesRouter);

module.exports = router;
