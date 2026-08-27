const express = require("express");

const {
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/vendorProductController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/products",
    protect,
    authorize("Vendor", "Admin"),
    createProduct
);

router.put(
    "/products/:id",
    protect,
    authorize("Vendor", "Admin"),
    updateProduct
);

router.delete(
    "/products/:id",
    protect,
    authorize("Vendor", "Admin"),
    deleteProduct
);

module.exports = router;