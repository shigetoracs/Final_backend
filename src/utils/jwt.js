import jwt from "jsonwebtoken";
import varenv from "../dotenv.js";

export const generateToken = (user) => {
  /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
  const token = jwt.sign({ user }, "coderhouse", {
    expiresIn: "12h",
  });
  return token;
};
//se genera el token
console.log(
  generateToken({
    _id: "65fe20bac08e9a187ecd376c",
    first_name: "ana",
    last_name: "anas",
    age: 33,
    password: "$2b$15$/V4NXuXjuRhchY1vEnzfReXf9iNPKmyiZyzgseNrerEtcicxkMV9u",
    email: "adminCoder@coder.com",
    rol: "Admin",
  })
);
/*
_id: "66009af8095e061dff5e30d0",
first_name: "pepe",
last_name: "pepes",
age: 33,
password: "$2b$15$aMYNrIc7800ItZTnn17iseoXJdBWE5xNRf1f2rsUHzbVqNNoCBN2C",
email: "pepe@pepe.com",
rol: "User",
__v: 0,
 */
