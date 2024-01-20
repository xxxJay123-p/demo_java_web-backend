import { Payment } from "../model/userPaymentModel.js";

export const addPayment = async (req, res, next) => {
  try {
    const { userId, amount, paymentMethod, paymentDetails } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    }

    // Create the new payment
    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      paymentDetails,
    });

    // Return success response with payment details
    return res.json({ status: true, payment });
  } catch (err) {
    next(err);
  }
};

export const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.json({ msg: "Payment not found", status: false });
    }

    return res.json({ status: true, payment });
  } catch (err) {
    next(err);
  }
};

export const getPaymentsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const payments = await Payment.find({ userId });

    if (!payments.length) {
      return res.json({ msg: "No payments found", status: false });
    }

    return res.json({ status: true, payments });
  } catch (err) {
    next(err);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, paymentMethod, paymentDetails } = req.body;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.json({ msg: "Payment not found", status: false });
    }

    payment.amount = amount;
    payment.paymentMethod = paymentMethod;
    payment.paymentDetails = paymentDetails;

    await payment.save();

    return res.json({ status: true, payment });
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.json({ msg: "Payment not found", status: false });
    }

    await payment.remove();

    return res.json({ msg: "Payment deleted", status: true });
  } catch (err) {
    next(err);
  }
};
