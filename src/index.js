import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import GithubStrategy from "passport-github2";
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexRouter.js";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport/passport.js";
import { config } from "dotenv";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import varenv from "./dotenv.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
const app = express();
const PORT = 8080;

// const io = new Server(server);

//Middlewares//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(varenv.mongo_url)
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: varenv.session_secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: varenv.mongo_url,
      ttl: 60 * 60,
      autoRemove: "interval", // remover sesiones caducadas en intervalos
    }),
  })
);

app.use(cookieParser(varenv.cookies_secret));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

//ROUTES COOKIES
// app.get("/setCookie", (req, res) => {
//   res
//     .cookie("CookieCookie", "Esto es una cookie", {
//       maxAge: 30000000000,
//       signed: true,
//     })
//     .send("Cookie Creada");
// });
// app.get("/getCookie", (req, res) => {
//   res.send(req.signedCookies);
// });
// app.get("/deleteCookie", (req, res) => {
//   res.clearCookie("CookieCookie").send("Cookie Eliminada");
// });
//ROUTES SESSIONS

// app.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send(`Sos el user num ${req.session.counter} en ingresar a la pagina`);
//   } else {
//     req.session.counter = 1;
//     res.send("sos el primer user en ingresar a la page");
//   }
// });

// io.on("connection", (socket) => {
//   console.log("Conexion con Socket.io");

//   socket.on("mensaje", async (mensaje) => {
//     try {
//       await messageModel.create(mensaje);
//       const mensajes = await messageModel.find();
//       io.emit("mensajeLogs", mensajes);
//     } catch (error) {
//       io.emit("mensajeLogs", error);
//     }
//   });
// });
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion de mi aplicacion ",
      description: "Descripcion de documentacion",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
//Server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
