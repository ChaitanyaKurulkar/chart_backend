import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
};

export const createOrder = async (req, res) => {
  //  console.log(req.headers);
  // console.log(req.body);
  const order = await Order.create(req.body);
  res.status(201).json(order);
};
