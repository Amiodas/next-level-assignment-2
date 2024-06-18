import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import ProductZodValidationSchema from "./product.validation";

// Create Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const validateData: any = ProductZodValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: "Product is added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.issues?.map((item: { message: unknown }) => item.message),
    });
  }
};

// Get all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchedItem = req.query.searchProduct;
    const result = await ProductServices.getAllProductsFromDB(searchedItem);
    res.status(200).json({
      success: true,
      message: "All products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.issues.map((item: { message: unknown }) => item.message),
    });
  }
};

// Get single product by id
const getSingleProductByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getSingleProductByIdFromDB(id);

    res.status(200).json({
      success: true,
      message: "Single product get successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error:
        error.issues.map((item: { message: unknown }) => item.message) ||
        "Internal Server Error",
    });
  }
};

// Update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    const result = await ProductServices.updateProductById(id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Update failed",
      error:
        error.issues.map((item: { message: unknown }) => item.message) ||
        "Internal Server Error",
    });
  }
};

// Delete product
const deleteProduct = (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    ProductServices.deleteProductById(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully !",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Product can not delete.",
      error:
        error.issues.map((item: { message: unknown }) => item.message) ||
        "Internal Server Error",
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProductByID,
  updateProduct,
  deleteProduct,
};
