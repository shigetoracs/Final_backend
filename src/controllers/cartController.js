import cartModel from "../models/cart.js";
import productModel from "../models/productModel.js";
import ticketModel from "../models/ticket.js";
import crypto from "crypto";
export const getCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findById(cartId).populate("products.id_prod");
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar carrito: ${error}`);
  }
};

export const createCart = async (req, res) => {
  try {
    const mensaje = await cartModel.create({ products: [] });
    res.status(201).send(mensaje);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear carrito: ${error}`);
  }
};

export const insertProductCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    const indice = cart.products.findIndex(
      (product) => product.id_prod == productId
    );

    if (indice !== -1) {
      cart.products[indice].quantity = quantity;
    } else {
      cart.products.push({ id_prod: productId, quantity: quantity });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al crear producto: ${error}`);
  }
};
export const createTicket = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await cartModel.findById(cartId).populate("products.id_prod");
    const prodSinStock = [];

    if (cart) {
      for (const prod of cart.products) {
        let producto = await productModel.findById(prod.id_prod);
        if (!producto || producto.stock < prod.quantity) {
          prodSinStock.push(prod.id_prod);
        }
      }

      if (prodSinStock.length === 0) {
        let totalPrice = cart.products.reduce((total, prod) => {
          return total + prod.id_prod.price * prod.quantity;
        }, 0);

        const newTicket = await ticketModel.create({
          code: crypto.randomUUID(),
          purchaser: req.user.email,
          amount: totalPrice,
          products: cart.products,
        });

        for (const prod of cart.products) {
          await productModel.findByIdAndUpdate(prod.id_prod, {
            $inc: { stock: -prod.quantity },
          });
        }

        await cartModel.findByIdAndUpdate(cartId, { products: [] });
        res.status(200).json({ ticketId: newTicket._id });
      } else {
        cart.products = cart.products.filter(
          (prod) => !prodSinStock.includes(prod.id_prod)
        );

        await cartModel.findByIdAndUpdate(cartId, { products: cart.products });

        res.status(400).send(`Productos sin stock: ${prodSinStock}`);
      }
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).send(`Error interno del servidor: ${error.message}`);
  }
};

export const getTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const ticket = await ticketModel
      .findById(ticketId)
      .populate("products.id_prod");
    if (!ticket) {
      return res.status(404).send("Ticket no encontrado");
    }
    res.status(200).send(ticket);
  } catch (error) {
    res
      .status(500)
      .send(`Error interno del servidor al consultar ticket: ${error}`);
  }
};
