import bcrypt from "bcrypt";
const salt = 10;
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(salt));
export const validatePassword = (passwordSend, passwordBdd) =>
  bcrypt.compareSync(passwordSend, passwordBdd);
