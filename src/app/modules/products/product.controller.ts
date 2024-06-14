import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// Create Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product);
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
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: "All Products fetched successfully!",
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
    const id = req.params.productID;
    const result = await ProductServices.getSingleProductByIdFromDB(id);

    res.status(200).json({
      success: true,
      message: "Specified Id product data fetch successfully!",
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
    const id = req.params.productID;

    const result = await ProductServices.updateProductByID(id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Update to failed, Internal Server error",
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
};
