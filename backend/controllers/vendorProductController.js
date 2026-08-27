const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Validate required fields
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                message: "Name, description, price and category are required"
            });
        }

        // Create product and assign ownership to the logged-in vendor
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock: stock || 0,
            vendor: req.user._id
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error.message);

        res.status(500).json({
            message: "Unable to create product"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        // Find the product AND verify that the logged-in user owns it
        const product = await Product.findOne({
            _id: id,
            vendor: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you do not own this product"
            });
        }

        // Update only the fields that were provided
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = stock;

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Update product error:", error.message);

        res.status(500).json({
            message: "Unable to update product"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product AND verify that the logged-in user owns it
        const product = await Product.findOneAndDelete({
            _id: id,
            vendor: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you do not own this product"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error.message);

        res.status(500).json({
            message: "Unable to delete product"
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
};