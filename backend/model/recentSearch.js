const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema({
    term: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("RecentSearch", recentSearchSchema);
