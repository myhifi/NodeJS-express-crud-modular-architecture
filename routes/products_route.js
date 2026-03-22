const express = require("express");
const router = express.Router();
const Joi = require("joi");

// 1. Fake Data (The "Database")
const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
];

// 2. Validation Schema
// Elementary Logic: You could reuse the UserSchema, but...
// Best Practice: Products may have different requirements (e.g., price > 1).
const ProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().trim(),
    price: Joi.number().min(1).required(),
});

// 3. HTTP Verbs (Routes)

// GET All Products
router.get("/", (req, res) => {
    res.json(products);
});

// GET Single Product
router.get("/:id", (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) return res.status(404).json({ message: "Product Not Found" });
    res.json(product);
});

// POST Create Product
router.post("/", (req, res) => {
    const { error } = ProductSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, price } = req.body;
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Safer ID logic
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json({ message: "Product Added Successfully", data: newProduct });
});

// PUT Update Product
router.put("/:id", (req, res) => {
    const { error } = ProductSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const productId = Number(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) return res.status(404).json({ message: "Product Not Found" });

    // Nullish Coalescing
    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;

    res.json({ message: "Product Updated", data: product });
});

// DELETE Product
router.delete("/:id", (req, res) => {
    const productId = Number(req.params.id);
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) return res.status(404).json({ message: "Product Not Found" });

    const deleted = products.splice(index, 1);
    res.json({ message: "Product Deleted", data: deleted[0] });
});

module.exports = router;
