const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
