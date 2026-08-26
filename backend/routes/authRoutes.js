const express = require("express");

const { signup, login } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get(
    "/vendor-admin-test",
    protect,
    authorize("Vendor", "Admin"),
    (req, res) => {
        res.status(200).json({
            message: "Access granted",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    }
);

module.exports = router;