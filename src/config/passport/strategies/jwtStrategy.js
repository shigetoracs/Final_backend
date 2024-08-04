import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user.js";
import varenv from "../../../dotenv.js";

const cookieExtractor = (req) => {
  //{} no hay cookies != esta cookie no existe
  //Si existen cookies, asigno mi cookie en especifico
  console.log(req.cookies);
  const token = req.cookies ? req.cookies.jwtCookie : {};
  console.log(token);
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() esperar el token de JWT desde la peticion
  //jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) consultando desde las cookies
  secretOrKey: varenv.jwt_secret,
};
export const strategyJWT = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await userModel.findById(payload.user._id);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      //hubo error el ususario no se logeo
      done(e, null);
    }
  }
);
