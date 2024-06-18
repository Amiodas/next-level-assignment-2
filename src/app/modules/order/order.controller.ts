import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: any = req.body;
    const result: any = await OrderServices.createOrderIntoDB(order);

    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.issues.map((item: { message: unknown }) => item.message),
    });
  }
};

export const OrderControllers = {
  createOrder,
};
