import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading, error, darkMode }) {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const baseTextClass = darkMode ? "text-gray-300" : "text-gray-600";

    if (loading) return <div className={`${baseTextClass} `}>Loading…</div>;
    if (!loading && products.length === 0)
        return <div className={`${baseTextClass} text - center py - 10 text - lg`}>No products found</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {products.map((p) => (
                <motion.div key={p._id || p.id} variants={itemVariants}>
                    <ProductCard product={p} darkMode={darkMode} />
                </motion.div>
            ))}
        </motion.div>
    );

}
