const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class AuthController {
  login = async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw new Error("Email not found");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        throw new Error("Password is wrong");
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        "132jdajdhat&5dsm$sdfr5$*&shG",
        {
          expiresIn: "3600000",
        }
      );

      res.json({
        message: "Login successfully",
        accessToken: accessToken,
        expiresIn: 3600000,
        type: "Bearer",
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
module.exports = new AuthController();
