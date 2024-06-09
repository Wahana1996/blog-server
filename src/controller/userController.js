const { Users, Files } = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  async register(req, res) {
    try {
      const confirmNewPassword = req.body.confirmNewPassword;
      let newPassword = await bcrypt.hash(req.body.newPassword, 12);

      const password = await bcrypt.compare(confirmNewPassword, newPassword);

      if (!password) {
        res.status(501).json({
          message: "password not match",
        });
      }

      const results = await Users.create({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: newPassword,
        status: req.body.status,
        avatar: req.body.avatar,
      });

      res.status(200).json({
        message: "register successfully",
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
      const results = await Users.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      const count = await Users.count();
      res.json({
        message: `${count} Data users retrieved successfully`,
        count: count,
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async showOne(req, res) {
    try {
      const results = await Users.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      res.json({
        message: "Data users retrieved successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async update(req, res) {
    try {
      const confirmNewPassword = req.body.confirmNewPassword;
      let newPassword = await bcrypt.hash(req.body.newPassword, 12);

      const password = await bcrypt.compare(confirmNewPassword, newPassword);

      if (!password) {
        res.status(501).json({
          message: "password not match",
        });
      }

      const results = await Users.update(
        {
          fullName: req.body.fullName,
          email: req.body.email,
          role: req.body.role,
          password: newPassword,
          status: req.body.status,
          avatar: req.body.avatar,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        message: "User updated successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const results = await Users.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Berhasil delet users",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async oneToMany(req, res) {
    try {
      const results = await Users.findAll({
        include: [
          {
            model: Files,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        message: "one to many relation successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}
module.exports = new UserController();
