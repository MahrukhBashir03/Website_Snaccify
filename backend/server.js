const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Order = require("./order"); 

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/snaccify", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// POST route to save an order
app.post("/api/order", async (req, res) => {
  try {
    const { orderNumber, customerName, items } = req.body;

    // Add itemTotal to each item
    const updatedItems = items.map(item => ({
      ...item,
      itemTotal: item.quantity * item.price
    }));

    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.itemTotal, 0);

    const newOrder = new Order({
      orderNumber,
      customerName,
      items: updatedItems,
      totalItems,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({
      message: "✅ Order saved successfully",
      order: newOrder  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Failed to save order", error });
  }
});

// GET route to fetch all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Failed to fetch orders", error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
