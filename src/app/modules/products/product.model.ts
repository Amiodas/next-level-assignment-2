import { Schema, model } from "mongoose";

const ProductVariantsSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const ProductInventorySchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  instock: {
    type: String,
    required: true,
  },
});

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  variants: [{ type: ProductVariantsSchema }],
  inventory: [{ type: ProductInventorySchema }],
});

export const Product = model("Product", ProductSchema);
