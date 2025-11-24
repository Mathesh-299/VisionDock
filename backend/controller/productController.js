const Product = require("../model/productModel");
const recentSearch = require("../model/recentSearch");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ name: 1 });
        res.status(200).json({ products, message: "Products fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.searchProducts = async (req, res) => {
    try {
        const q = req.query.q?.trim() || "";
        const priceSort = req.query.price;
        const ratingSort = req.query.rating;
        const alphaSort = req.query.alpha;
        const recentSort = req.query.recent === "true";

        if (q) {
            const exists = await recentSearch.findOne({ term: q });
            if (!exists) {
                await recentSearch.create({ term: q });

                const total = await recentSearch.countDocuments();
                if (total > 5) {
                    const oldest = await recentSearch.find().sort({ createdAt: 1 }).limit(1);
                    if (oldest[0]) {
                        await recentSearch.findByIdAndDelete(oldest[0]._id);
                    }
                }
            }
        }

        const recentSearches = await recentSearch
            .find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("term");

        let filter = {};
        if (q) {
            filter.name = { $regex: q, $options: "i" };
        }

        let sortQuery = {};

        if (recentSort) {
            sortQuery = { createdAt: -1 };
        } else if (priceSort) {
            sortQuery = { price: priceSort === "asc" ? 1 : -1 };
        } else if (ratingSort) {
            sortQuery = { rating: ratingSort === "asc" ? 1 : -1 };
        } else if (alphaSort) {
            sortQuery = { name: alphaSort === "asc" ? 1 : -1 };
        }

        const products = await Product.find(filter)
            .sort(sortQuery)
            .limit(20)
            .select("name price rating imageUrl category createdAt");

        res.status(200).json({
            recentSearches: recentSearches.map(s => s.term),
            products
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
