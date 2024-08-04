import { sendEmailChangePassword } from "../utils/nodemailer.js";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";
export const login = (req, res) => {
  try {
    const user = req.user;
    req.session.user = {
      _id: user._id,
      email: user.email,
      rol: user.rol,
      cart_id: user.cart_id,
    };
    console.log("Datos de la sesión:", req.session.user);

    res.status(200).json({ rol: req.session.user.rol });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const register = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Usuario ya existente en la aplicacion");
    }

    res.redirect("/");
  } catch (e) {
    res.status(500).send("Error al registrar usuario");
  }
};
export const logout = async (req, res) => {
  const user = await userModel.findOne({ email: req.session.user.email });
  if (user) {
    user.last_connection = new Date();
    await user.save(); // Guarda la fecha de la última conexión
  }

  req.session.destroy(function (e) {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect("/");
    }
  });
};
export const sessionGithub = async (req, res) => {
  req.session.user = {
    email: req.user.email,
    first_name: req.user.name,
  };
  res.redirect("/");
};
export const testJWT = async (req, res) => {
  if (req.user.rol == "User") res.status(403).send("Usuario no autorizado");
  else res.status(200).send(req.user);
};
export const changePassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const validateToken = jwt.verify(token.substr(6), "coderhouse");
    const user = await userModel.findOne({ email: validateToken.userEmail });
    if (user) {
      if (!validatePassword(newPassword, user.password)) {
        const hashPassword = createHash(newPassword);
        user.password = hashPassword;
        const resultado = await userModel.findByIdAndUpdate(user._id, user);
        res.status(200).send("contra modificada correctamente");
      } else {
        res.status(400).send("las contrasenas no puede identicaa la aneterior");
      }
    } else {
      res.status(400).status("user no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
export const sendEmailPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.find({ email: email });

  try {
    if (user) {
      const token = jwt.sign({ userEmail: email }, "coderhouse", {
        expiresIn: "1h",
      });
      const resetLink = `http://localhost:8080/api/session/reset-password?token=${token}`;
      sendEmailChangePassword(email, resetLink);
      res.status(200).send("Ok email enviado");
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    console.log(e);
    if ((e.message = "jwt expired")) {
      res.status(400).send("token expirado");
    }
    res.status(500).send(e);
  }
};
