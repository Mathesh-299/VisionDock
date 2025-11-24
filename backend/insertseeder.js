const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productModel = require("./model/productModel");

dotenv.config();

// ===== Mock Data (30 items, 10 categories) =====
const products = [
    // 1. Electronics
    { name: "Smartphone Max 20", category: "Electronics", price: 29999, rating: 4.5, imageUrl: "https://via.placeholder.com/200" },
    { name: "Wireless Earbuds Pro", category: "Electronics", price: 1999, rating: 4.2, imageUrl: "https://via.placeholder.com/200" },
    { name: "Bluetooth Speaker X3", category: "Electronics", price: 1599, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },

    // 2. Fashion
    { name: "Men's Cotton T-Shirt", category: "Fashion", price: 499, rating: 4.1, imageUrl: "https://via.placeholder.com/200" },
    { name: "Women's Summer Dress", category: "Fashion", price: 899, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },
    { name: "Sports Running Shoes", category: "Fashion", price: 1299, rating: 4.5, imageUrl: "https://via.placeholder.com/200" },

    // 3. Home Appliances
    { name: "Air Fryer Compact", category: "Home Appliances", price: 3499, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },
    { name: "Electric Kettle 2L", category: "Home Appliances", price: 799, rating: 4.2, imageUrl: "https://via.placeholder.com/200" },
    { name: "Mixer Grinder Pro", category: "Home Appliances", price: 2499, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },

    // 4. Sports
    { name: "Cricket Bat Classic", category: "Sports", price: 1499, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },
    { name: "Football Size 5", category: "Sports", price: 699, rating: 4.2, imageUrl: "https://via.placeholder.com/200" },
    { name: "Yoga Mat Pro", category: "Sports", price: 899, rating: 4.6, imageUrl: "https://via.placeholder.com/200" },

    // 5. Beauty
    { name: "Face Moisturizer Glow", category: "Beauty", price: 299, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },
    { name: "Hair Shampoo Herbal", category: "Beauty", price: 249, rating: 4.1, imageUrl: "https://via.placeholder.com/200" },
    { name: "Perfume Morning Mist", category: "Beauty", price: 799, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },

    // 6. Books
    { name: "The Power of Habit", category: "Books", price: 499, rating: 4.8, imageUrl: "https://via.placeholder.com/200" },
    { name: "Atomic Habits", category: "Books", price: 399, rating: 4.9, imageUrl: "https://via.placeholder.com/200" },
    { name: "Think and Grow Rich", category: "Books", price: 299, rating: 4.7, imageUrl: "https://via.placeholder.com/200" },

    // 7. Toys
    { name: "Remote Car Turbo", category: "Toys", price: 999, rating: 4.2, imageUrl: "https://via.placeholder.com/200" },
    { name: "Building Blocks Set", category: "Toys", price: 599, rating: 4.5, imageUrl: "https://via.placeholder.com/200" },
    { name: "Kids Puzzle Pack", category: "Toys", price: 349, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },

    // 8. Furniture
    { name: "Office Chair Comfort", category: "Furniture", price: 4999, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },
    { name: "Wooden Study Table", category: "Furniture", price: 2999, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },
    { name: "Single Bed Foam", category: "Furniture", price: 5499, rating: 4.2, imageUrl: "https://via.placeholder.com/200" },

    // 9. Grocery
    { name: "Basmati Rice 5kg", category: "Grocery", price: 599, rating: 4.6, imageUrl: "https://via.placeholder.com/200" },
    { name: "Organic Atta 5kg", category: "Grocery", price: 259, rating: 4.3, imageUrl: "https://via.placeholder.com/200" },
    { name: "Sunflower Oil 1L", category: "Grocery", price: 159, rating: 4.4, imageUrl: "https://via.placeholder.com/200" },

    // 10. Automotive
    { name: "Car Vacuum Cleaner", category: "Automotive", price: 1299, rating: 4.1, imageUrl: "https://via.placeholder.com/200" },
    { name: "Bike Helmet Pro", category: "Automotive", price: 899, rating: 4.5, imageUrl: "https://via.placeholder.com/200" },
    { name: "Car Dashboard Perfume", category: "Automotive", price: 299, rating: 4.2, imageUrl: "https://via.placeholder.com/200" }
];

// ===== Insert Function =====
const insertData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await productModel.deleteMany();
        await productModel.insertMany(products);

        console.log("Mock Products Inserted Successfully");
        process.exit();
    } catch (err) {
        console.error("Error inserting mock data:", err);
        process.exit(1);
    }
};

insertData();
