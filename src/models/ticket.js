// ticket.js
import { Schema, model } from "mongoose";
import crypto from "crypto";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  products: {
    type: [
      {
        id_prod: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

ticketSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = crypto.randomUUID();
  }
  next();
});

const Ticket = model("ticket", ticketSchema);

export default Ticket;
