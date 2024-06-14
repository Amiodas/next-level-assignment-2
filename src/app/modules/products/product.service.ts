import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// Create product
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// Get all product
const getAllProductsFromDB = async (searchProduct?: string | unknown) => {
  if (searchProduct) {
    const SearchProducts = await ProductModel.find({
      $or: [
        { name: { $regex: searchProduct } },
        { category: { $regex: searchProduct } },
      ],
    });
    return SearchProducts;
  } else {
    const product = await ProductModel.find();
    return product;
  }
};

// Get single product by id
const getSingleProductByIdFromDB = async (id: string) => {
  const product = await ProductModel.findById({ _id: id });
  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductByIdFromDB,
};
