const { Posts, Categories, PostCategories } = require("../models");
const slugify = require("slugify");

class PostCategoriesController {
  async store(req, res) {
    try {
      const results = await PostCategories.create({
        postId: req.body.postId,
        categoryId: req.body.categoryId,
      });

      res.status(200).json({
        message: "Post created successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}
module.exports = new PostCategoriesController();
