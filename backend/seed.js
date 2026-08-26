const mongoose = require("mongoose");
const dns = require("dns");
const bcrypt = require("bcrypt");
require("dotenv").config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const User = require("./models/User");
const Product = require("./models/Product");

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Connected to MongoDB Atlas");

        // Hash the test vendor password before storing it
        const hashedPassword = await bcrypt.hash("testpassword", 12);

        const vendor = await User.create({
            name: "NexusCart Test Vendor",
            email: "vendor@nexuscart.com",
            password: hashedPassword,
            role: "Vendor"
        });

        console.log("✅ Test vendor created:", vendor._id);

        const products = [
            {
                name: "iPhone 17",
                description: "Latest Apple smartphone with advanced features",
                price: 79999,
                category: "Mobiles",
                stock: 20,
                vendor: vendor._id
            },
            {
                name: "Samsung Galaxy S26",
                description: "Premium Android smartphone with powerful performance",
                price: 69999,
                category: "Mobiles",
                stock: 15,
                vendor: vendor._id
            },
            {
                name: "Dell Inspiron 15",
                description: "Reliable laptop for work and everyday use",
                price: 65000,
                category: "Laptops",
                stock: 10,
                vendor: vendor._id
            },
            {
                name: "HP Pavilion Gaming",
                description: "Gaming laptop with dedicated graphics",
                price: 85000,
                category: "Laptops",
                stock: 8,
                vendor: vendor._id
            },
            {
                name: "Sony WH-1000XM6",
                description: "Wireless noise-cancelling headphones",
                price: 29999,
                category: "Audio",
                stock: 25,
                vendor: vendor._id
            }
        ];

        await Product.insertMany(products);

        console.log(`✅ ${products.length} test products created`);

    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Database connection closed");
    }
}

seedDatabase();