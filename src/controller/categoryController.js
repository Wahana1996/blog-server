const { Categories } = require("../models");

class CategoryController {
  async store(req, res) {
    try {
      const results = await Categories.create({
        tittle: req.body.tittle,
      });

      res.status(200).json({
        message: "category created successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async showAll(req, res) {
    try {
      const results = await Categories.findAll({
        attributes: {
          exclude: ["deletedAt"],
        },
      });
      const count = await Categories.count();
      res.json({
        message: `${count} Data category retrieved successfully`,
        count: count,
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async getById(req, res) {
    try {
      const results = await Categories.findOne({
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

  async updateCategory(req, res) {
    try {
      await Categories.update(
        {
          title: req.body.title,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        message: "category updated successfully",
        results: {
          title: req.body.title,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const results = await Categories.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "delete category is successfully",
        results,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new CategoryController();
