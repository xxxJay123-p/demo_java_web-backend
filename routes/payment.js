import {
  addPayment,
  getPayment,
  updatePayment,
  getPaymentsByUserId,
  deletePayment,
} from "../controller/userPaymentController.js";
import express from "express";

const paymentRoutes = express.Router();

// Add payment endpoint
paymentRoutes.post("/:userId/payment", addPayment);

// Get payment endpoint
paymentRoutes.get("/:userId/payment/:paymentId", getPayment);

// Get all payments by user ID endpoint
paymentRoutes.get("/:userId/payments", getPaymentsByUserId);

// Update payment endpoint
paymentRoutes.put("/:userId/payment/:paymentId", updatePayment);

// Delete payment endpoint
paymentRoutes.delete("/:userId/payment/:paymentId", deletePayment);

export default paymentRoutes;
