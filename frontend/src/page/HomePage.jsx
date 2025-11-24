import { useEffect, useRef, useState } from "react";
import API from "../api/api";
import ProductGrid from "../components/ProductGrid";

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [priceSort, setPriceSort] = useState("");
    const [ratingSort, setRatingSort] = useState("");
    const [alphaSort, setAlphaSort] = useState("");
    const [recentSort, setRecentSort] = useState(false);

    const [darkMode, setDarkMode] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        const loadInitial = async () => {
            setLoading(true);
            try {
                const res = await API.get("/products");
                setProducts(res.data.products || []);
            } catch {
                setError("Could not load products");
            } finally {
                setLoading(false);
            }
        };
        loadInitial();
    }, []);

    const doSearch = async (q) => {
        if (!q) return;
        setLoading(true);
        setError("");
        try {
            const params = { q };
            if (priceSort) params.price = priceSort;
            if (ratingSort) params.rating = ratingSort;
            if (alphaSort) params.alpha = alphaSort;
            if (recentSort) params.recent = "true";

            const res = await API.get("/search", { params });
            setProducts(res.data.products || []);
            setRecentSearches(res.data.recentSearches || []);
        } catch (err) {
            setError(err.response?.data?.message || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    const onRecentClick = (term) => {
        setQuery(term);
        doSearch(term);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="flex justify-end p-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 rounded-lg bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white font-semibold shadow hover:brightness-110 transition"
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
            <header
                className="bg-white dark:bg-gray-800 rounded-xl mt-6 py-16 text-center shadow-xl relative overflow-hidden dark:text-white text-black"
            >

                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="white" fillOpacity="0.05" d="M0,160L1440,64L1440,320L0,320Z"></path>
                    </svg>
                </div>

                <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">VisionDock</h1>
                <p className="mt-2 text-lg opacity-90 max-w-2xl mx-auto drop-shadow-sm">
                    Search products quickly — live search, filters & recent queries.
                </p>

                {/* SEARCH BAR */}
                <div className="flex gap-3 justify-center mt-8">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-80 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 dark:bg-gray-800 dark:text-white transition duration-300 shadow-md hover:shadow-lg"
                        placeholder="Search for products..."
                    />
                    <button
                        onClick={() => doSearch(query)}
                        className="bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 transform hover:-translate-y-0.5"
                    >
                        Search
                    </button>
                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-4 justify-center mt-8 bg-white/25 dark:bg-gray-800/50 backdrop-blur-lg p-5 rounded-xl shadow-inner">
                    <label className="text-black dark:text-white flex items-center gap-2">
                        Price:
                        <select
                            className="px-3 py-2 rounded text-black dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                        >
                            <option value="">None</option>
                            <option value="asc">Low → High</option>
                            <option value="desc">High → Low</option>
                        </select>
                    </label>

                    <label className="text-black dark:text-white flex items-center gap-2">
                        Rating:
                        <select
                            className="px-3 py-2 rounded text-black dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                            value={ratingSort}
                            onChange={(e) => setRatingSort(e.target.value)}
                        >
                            <option value="">None</option>
                            <option value="asc">Low → High</option>
                            <option value="desc">High → Low</option>
                        </select>
                    </label>

                    <label className="text-black dark:text-white flex items-center gap-2">
                        Name:
                        <select
                            className="px-3 py-2 rounded text-black dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                            value={alphaSort}
                            onChange={(e) => setAlphaSort(e.target.value)}
                        >
                            <option value="">None</option>
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                        </select>
                    </label>

                    <label className="text-black dark:text-white flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={recentSort}
                            onChange={(e) => setRecentSort(e.target.checked)}
                            className="accent-yellow-400"
                        />
                        Newest
                    </label>

                    <button
                        onClick={() => {
                            setPriceSort(""); setRatingSort(""); setAlphaSort(""); setRecentSort(false);
                        }}
                        className="px-4 py-2 bg-red-400 dark:bg-red-600 text-white rounded hover:brightness-110 transition"
                    >
                        Reset Filters
                    </button>
                </div>
            </header>

            {/* Recent Searches */}
            <section className="mt-10 max-w-7xl mx-auto px-4">
                <h4 className="text-lg font-semibold mb-3">Recent Searches</h4>
                {recentSearches.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400">No recent searches</div>
                ) : (
                    <div className="flex gap-2 flex-wrap">
                        {recentSearches.map((term) => (
                            <button
                                key={term}
                                onClick={() => onRecentClick(term)}
                                className="px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm shadow transition"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* Products */}
            <section className="mt-10 max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <ProductGrid products={products} loading={loading} error={error} darkMode={darkMode} />
            </section>
        </div>
    );

}
