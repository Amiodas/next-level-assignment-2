import { ProductModel } from "../products/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (orderItem: Order) => {
  console.log(orderItem);
  const findProduct: any = await ProductModel.findById({
    _id: orderItem.productId,
  });
  if (orderItem.quantity <= findProduct.inventory.quantity) {
    let updateQuantity = findProduct.inventory?.quantity - orderItem.quantity;
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: orderItem.productId },
      { $set: { "inventory.quantity": updateQuantity } },
      { new: true }
    );
    if (updateProduct?.inventory?.quantity === 0) {
      await ProductModel.findByIdAndUpdate(
        { _id: orderItem.productId },
        {
          $set: { "inventory.inStock": "false" },
        }
      );
    }
    const createOrder = await OrderModel.create(orderItem);
    return {
      success: true,
      message: "Order created successfully!",
      data: createOrder,
    };
  }

  return {
    success: false,
    message: "Insufficient quantity available inventory",
  };
};

export const OrderServices = {
  createOrderIntoDB,
};
