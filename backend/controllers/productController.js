const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const { category, sort } = req.query;

        // Category filter
        const filter = {};

        if (category) {
            filter.category = category;
        }

        // Basic sorting
        let sortOption = {};

        if (sort === "price_asc") {
            sortOption.price = 1;
        } else if (sort === "price_desc") {
            sortOption.price = -1;
        }

        const products = await Product.find(filter).sort(sortOption);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

module.exports = {
    getProducts
};