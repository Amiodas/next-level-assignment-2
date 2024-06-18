import { z } from "zod";

const ProductInventoryZodValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be a non-negative number."),
  inStock: z.boolean(),
});

const productVariantsZodValidationSchema = z.object({
  type: z.string().min(1, "Variant type must be string"),
  value: z.string().min(1, "Variant value must be string"),
});

const ProductZodValidationSchema = z.object({
  name: z.string().min(1, "Name of the product must be string."),
  description: z.string().min(1, "Description is must be string."),
  price: z.number(),
  category: z.string().trim().min(1, "Category is must be string."),
  tags: z.array(z.string()).default([]),
  variants: z.array(productVariantsZodValidationSchema).default([]),
  inventory: ProductInventoryZodValidationSchema,
});

export default ProductZodValidationSchema;
