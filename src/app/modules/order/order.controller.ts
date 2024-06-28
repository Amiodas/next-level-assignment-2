import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

// Create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order: any = req.body;
    const validateOrder = OrderValidationSchema.parse(order);
    const result: any = await OrderServices.createOrderIntoDB(validateOrder);
    console.log(result);

    res.status(200).json({
      success: result?.success,
      message: result?.message,
      data: result?.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.issues.map((item: { message: unknown }) => item.message),
    });
  }
};

// Get all orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { email }: any = req.query;

    const result = await OrderServices.getOrderIntoDB(email);
    res.status(200).json({
      success: true,
      message: result.length
        ? "Orders fetched successfully!"
        : "Order not found",
      data: result.length ? result : null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.issues.map((item: { message: unknown }) => item.message),
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
