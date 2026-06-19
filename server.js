const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));


const products = [
    { id: 1, name: "Premium Watch", price: 250, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 2, name: "Wireless Headphones", price: 150, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 3, name: "Smart Phone", price: 800, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" },
    { id: 4, name: "Gaming Laptop", price: 1200, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300" }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/order', (req, res) => {
    const { cart, user } = req.body;
    console.log(`Order received from ${user}:`, cart);
    res.json({ success: true, message: "Order placed successfully!", orderId: "ORD-" + Math.floor(Math.random()*10000) });
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});