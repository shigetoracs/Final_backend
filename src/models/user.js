import { Schema, model } from "mongoose";
import cartModel from "./cart.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  rol: {
    type: String,
    default: "User",
  },
  documents: {
    type: Array,
    default: [],
  },
  last_connection: {
    type: Date,
  },
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

// Middleware para crear un carrito nuevo al registrar un nuevo usuario
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const newCart = await cartModel.create({ products: [] });
      this.cart_id = newCart._id;
    } catch (e) {
      return next(e);
    }
  }
  next();
});

// Middleware para poblar el carrito al buscar usuarios
userSchema.pre(["find", "findOne"], function (next) {
  this.populate("cart_id");
  next();
});

export const userModel = model("users", userSchema);
