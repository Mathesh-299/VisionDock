import { motion } from "framer-motion";
import formatDate from "../utils/formatDate";

export default function ProductCard({ product, darkMode }) {
    return (
        <motion.div
            className={`rounded-xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col cursor-pointer
                ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className={`w-full h-48 flex items-center justify-center rounded-md overflow-hidden
                ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                {product.imageUrl ? (
                    <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    />
                ) : (<div className="text-gray-400">No Image</div>
                )} </div>

            <div className="mt-3">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-blue-600 font-bold text-base">
                        ${product.price?.toFixed?.(2) ?? "-"}
                    </span>
                    <span className="text-yellow-500">⭐ {product.rating ?? "-"}</span>
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-400 dark:text-gray-400">
                    <span>{product.category}</span>
                    <span>{formatDate(product.createdAt)}</span>
                </div>
            </div>
        </motion.div>
    );

}
