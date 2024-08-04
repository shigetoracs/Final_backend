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

//Middlewares//
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
