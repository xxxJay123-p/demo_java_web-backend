import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["credit_card", "debit_card", "paypal"],
  },
  paymentDetails: {
    type: {
      creditCard: {
        type: new mongoose.Schema({
          cardNumber: {
            type: String,
            required: true,
          },
          expiryMonth: {
            type: String,
            required: true,
          },
          expiryYear: {
            type: String,
            required: true,
          },
          cvv: {
            type: String,
            required: true,
          },
          cardHolderName: {
            type: String,
            required: true,
          },
        }),
      },
      debitCard: {
        type: new mongoose.Schema({
          cardNumber: {
            type: String,
            required: true,
          },
          expiryMonth: {
            type: String,
            required: true,
          },
          expiryYear: {
            type: String,
            required: true,
          },
          cvv: {
            type: String,
            required: true,
          },
          cardHolderName: {
            type: String,
            required: true,
          },
        }),
      },
      paypal: {
        type: new mongoose.Schema({
          email: {
            type: String,
            required: true,
          },
        }),
      },
    },
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);
