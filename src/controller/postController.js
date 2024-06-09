const { Posts, Categories, PostCategories } = require("../models");
const slugify = require("slugify");

class PostController {
  async store(req, res) {
    try {
      const results = await Posts.create({
        where: {
          categoryId: req.params.categoryId,
        },
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        categoryId: req.params.categoryId,
        status: req.body.status,
        slug: slugify(req.body.title, { lower: true }),
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

  async showAll(req, res) {
    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Categories,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json({
        message: "find all post successfully",
        result: posts,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBySlug(req, res) {
    try {
      const results = await Posts.findOne({
        where: {
          slug: req.params.slug,
        },
      });
      res.status(200).json({
        message: "find with slug is successfully",
        results,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const results = await Posts.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "find with id is successfully",
        results,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      await Posts.update(
        {
          title: req.body.title,
          description: req.body.description,
          thumbnail: req.body.thumbnail,
          categoryId: req.params.categoryId,
          status: req.body.status,
          slug: slugify(req.body.title, { lower: true }),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        message: "Post updated successfully",
        results: {
          title: req.body.title,
          description: req.body.description,
          thumbnail: req.body.thumbnail,
          categoryId: req.params.categoryId,
          status: req.body.status,
          slug: slugify(req.body.title, { lower: true }),
        },
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async deletePost(req, res) {
    try {
      const results = await Posts.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "delete post is successfully",
        results,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new PostController();
