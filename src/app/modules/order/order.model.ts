import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const OrderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const OrderModel = model<Order>("Order", OrderSchema);
