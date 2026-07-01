const express = require('express')
const app = express();
const PORT = 3000;

const db = require("./DB/db")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server running");
});

app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        res.json(result);
    });
});

app.get("/cart", (req, res) => {
    db.query(
        "SELECT cart.id, cart.product_id, cart.quantity, products.name, products.price FROM cart JOIN products ON cart.product_id = products.id",
        (err, result) => {
            res.json(result);
        }
    );
});

app.post("/cart", (req, res) => {
    const { product_id } = req.body;
    db.query("SELECT * FROM cart WHERE product_id = ?", [product_id], (err, rows) => {
        if (rows.length > 0) {
            db.query("UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?", [product_id], (err) => {
                res.json({ success: true });
            });
        } else {
            db.query("INSERT INTO cart (product_id, quantity) VALUES (?, 1)", [product_id], (err) => {
                res.json({ success: true });
            });
        }
    });
});


app.get("/lesgo", (req, res) => {
    db.query("SELECT * FROM cart", (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.put("/cart/:productId", (req, res) => {
    db.query("UPDATE cart SET quantity = ? WHERE product_id = ?", [req.body.quantity, req.params.productId], (err) => {
        res.json({ success: true });
    });
});

app.delete("/cart/:productId", (req, res) => {
    db.query("DELETE FROM cart WHERE product_id = ?", [req.params.productId], (err) => {
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
