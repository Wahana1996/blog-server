const multer = require("multer");
const env = require("dotenv").config().parsed;

//storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "upload/image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const formData = multer({ storage: storage });

const { Files, Users } = require("../models");

class FileController {
  async store(req, res) {
    try {
      const results = await Files.create({
        filename: req.body.filename,
        type: req.body.type,
        url: req.body.url,
        path: req.body.path,
        userId: req.body.userId,
      });

      res.status(200).json({
        message: "file created successfully",
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
      const results = await Files.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Berhasil delet file",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  upload(req, res) {
    formData.single("avatar")(req, res, function (err) {
      if (err) {
        return res.json({
          pesan: err.message,
        });
      } else {
        res.json({
          pesan: "upload file berhasil",
          type: req.file.mimetype,
          filename: req.file.filename,
          path: req.file.path,
          url: `http://localhost:${env.PORT}/images/${req.file.filename}`,
        });
      }
    });
  }

  async oneToMany(req, res) {
    try {
      const results = await Files.findAll({
        include: [
          {
            model: Users,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
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
module.exports = new FileController();
