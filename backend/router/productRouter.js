const express = require("express");
const { getProducts, searchProducts } = require("../controller/productController");
const router = express.Router();

router.get("/products", getProducts);
router.get("/search", searchProducts);

module.exports = router;
