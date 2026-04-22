import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products, Product } from '../data/products';
import { AmazonHeader } from '../components/AmazonHeader';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const ResultsPage = () => {
    const location = useLocation();
    const [results, setResults] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState('1');
    const navigate = useNavigate();
    const { placeOrder } = useStore();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search')?.toLowerCase() || '';
        const q = params.get('quantity') || '1';
        const selectedId = params.get('productId');
        const autoBuy = params.get('autoBuy') === 'true';
        const deliveryDate = params.get('deliveryDate');

        setSearchQuery(params.get('search') || '');
        setQuantity(q);

        // Orchestration Handler: Auto-Buy selection from MIND
        if (selectedId && autoBuy) {
            const product = products.find(p => p.id === selectedId);
            if (product) {
                placeOrder([{ product, quantity: parseInt(q) }], deliveryDate || undefined);
                navigate('/orders');
                return;
            }
        }

        // Advanced filtering logic: Word-based match with fluff removal
        const searchFiller = ['best', 'top', 'latest', 'market', 'good', 'cheap', 'premium', 'high', 'quality', 'product', 'item', 'buy', 'get', 'me', 'want', 'search', 'find', 'need'];

        const queryWords = query.split(/\s+/).filter(w =>
            w.length > 1 && !searchFiller.includes(w)
        );

        // Stage 1: Try exact match or all significant words match
        let filtered = products.filter(p => {
            const productName = p.name.toLowerCase();
            const category = p.category.toLowerCase();
            const description = p.description.toLowerCase();

            // Exact query match (highest priority)
            if (productName.includes(query) || category.includes(query)) return true;

            // All-word match (for multi-word searches like "iPhone 16")
            if (queryWords.length > 0) {
                return queryWords.every(word =>
                    productName.includes(word) || category.includes(word) || description.includes(word)
                );
            }
            return false;
        });

        // Stage 2: Fallback to "any word" match if "all words" failed (for natural language queries)
        if (filtered.length === 0 && queryWords.length > 0) {
            filtered = products.filter(p => {
                const productName = p.name.toLowerCase();
                const category = p.category.toLowerCase();
                const description = p.description.toLowerCase();
                return queryWords.some(word =>
                    productName.includes(word) || category.includes(word) || description.includes(word)
                );
            });
        }

        // Sort: Best ratings first
        setResults(filtered.sort((a, b) => b.rating - a.rating));
    }, [location, navigate, placeOrder]);

    return (
        <div className="min-h-screen bg-white pb-10">
            <AmazonHeader />

            <div className="flex bg-white">
                {/* Left Sidebar - Options */}
                <div className="hidden md:block w-64 flex-shrink-0 p-4 border-r border-gray-200 text-sm">
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold mb-2">Delivery Day</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2"><input type="checkbox" /> Get It by Tomorrow</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> Get It in 2 Days</label>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">Category</h4>
                            <div className="space-y-1 text-gray-700">
                                <p className="font-bold text-black border-l-2 border-transparent pl-1 uppercase text-[11px] tracking-wider mb-2">Filters</p>
                                {['Smartphones', 'Fashion', 'Electronics', 'Sports', 'Travel'].map(cat => (
                                    <p key={cat} className="hover:text-amazon_yellow cursor-pointer pl-1">{cat}</p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">Customer Review</h4>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map(star => (
                                    <div key={star} className="flex items-center gap-1 cursor-pointer hover:text-orange-700">
                                        <div className="flex text-amazon_yellow">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i} className={i < star ? '' : 'text-gray-200'}>★</span>
                                            ))}
                                        </div>
                                        <span className="text-xs">& Up</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">Price</h4>
                            <div className="space-y-1 text-gray-700">
                                <p className="hover:text-orange-700 cursor-pointer">Under ₹1,000</p>
                                <p className="hover:text-orange-700 cursor-pointer">₹1,000 - ₹5,000</p>
                                <p className="hover:text-orange-700 cursor-pointer">₹5,000 - ₹10,000</p>
                                <p className="hover:text-orange-700 cursor-pointer">Over ₹20,000</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Results Area */}
                <div className="flex-grow p-4 md:p-6 bg-white overflow-hidden">
                    <div className="mb-4 text-sm font-medium border-b pb-2 flex justify-between items-center">
                        <p>
                            1-{results.length} of {results.length} results for <span className="text-[#C7511F] font-bold">"{searchQuery}"</span>
                        </p>
                        <div className="flex items-center gap-2 border bg-gray-50 px-2 py-1 rounded text-xs cursor-pointer shadow-sm">
                            Sort by: Featured <span className="text-[8px]">▼</span>
                        </div>
                    </div>

                    {results.length === 0 ? (
                        <div className="bg-white p-10 text-center border shadow-sm rounded-lg lg:mt-10">
                            <h2 className="text-xl font-bold mb-4">No results found for "{searchQuery}"</h2>
                            <p className="text-gray-600 italic">MIND could not find a matching product in our current inventory.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-4">
                            {results.map(product => (
                                <ProductCard key={product.id} product={product} quantity={quantity} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
