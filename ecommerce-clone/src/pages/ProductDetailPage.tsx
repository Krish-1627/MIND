import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { AmazonHeader } from '../components/AmazonHeader';
import { useStore } from '../context/StoreContext';
import { ChevronDown, MapPin, ShieldCheck, RefreshCcw } from 'lucide-react';

export const ProductDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart, placeOrder } = useStore();

    const product = products.find(p => p.id === id);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = parseInt(params.get('quantity') || '1');
        setQuantity(q > 0 ? q : 1);
    }, [location]);

    if (!product) return <div>Product Not Found</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const handleBuyNow = () => {
        placeOrder([{ product, quantity }]);
        navigate('/orders');
    };

    return (
        <div className="min-h-screen bg-white">
            <AmazonHeader />

            <div className="max-w-[1500px] mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-10">
                {/* Images Column */}
                <div className="md:w-5/12 flex gap-4">
                    <div className="hidden lg:flex flex-col gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 border border-gray-300 rounded p-1 cursor-pointer hover:border-amazon_yellow">
                                <img src={product.image} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-grow flex items-center justify-center p-4 border border-gray-100">
                        <img src={product.image} alt={product.name} className="max-h-[500px] object-contain" />
                    </div>
                </div>

                {/* Info Column */}
                <div className="md:w-4/12 flex flex-col">
                    <h1 className="text-2xl font-medium leading-8 text-slate-900 border-b pb-4 mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-amazon_yellow">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < Math.floor(product.rating) ? '' : 'text-gray-200'}>★</span>
                            ))}
                        </div>
                        <span className="amazon-link text-sm">{product.reviewCount} ratings</span>
                    </div>

                    <div className="border-b pb-4 mb-4">
                        <div className="flex items-baseline gap-1 text-[#B12704]">
                            <span className="text-sm font-medium">-18%</span>
                            <span className="text-[12px] align-top mt-1">₹</span>
                            <span className="text-2xl font-medium">{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-sm text-gray-500">M.R.P.: <span className="line-through">₹{(product.price * 1.2).toLocaleString('en-IN')}</span></p>
                        <p className="text-sm mt-2">Inclusive of all taxes</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <h4 className="font-bold text-sm">Product Description</h4>
                        <p className="text-sm leading-relaxed">{product.description}</p>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                            {product.specs.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Buying Column */}
                <div className="md:w-3/12">
                    <div className="border border-gray-300 rounded-lg p-4 space-y-4 shadow-sm sticky top-40">
                        <div className="flex items-baseline gap-1">
                            <span className="text-[12px] align-top mt-1 font-medium">₹</span>
                            <span className="text-2xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                        </div>

                        <p className="text-sm text-[#007600] font-medium">In stock</p>

                        <div className="bg-gray-100 rounded-lg p-3 text-xs space-y-2 border border-gray-200">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>Deliver to Bengaluru 560001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} />
                                <span>Amazon Delivered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCcw size={16} />
                                <span>7 days Replacement</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1 px-3 w-fit bg-gray-100 shadow-sm cursor-pointer hover:bg-gray-200">
                            <span className="text-sm font-medium">Qty: {quantity}</span>
                            <ChevronDown size={14} />
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button onClick={handleAddToCart} className="amazon-button">Add to Cart</button>
                            <button onClick={handleBuyNow} className="amazon-button-orange">Buy Now</button>
                        </div>

                        <div className="text-xs text-gray-500 pt-2 flex flex-col gap-1">
                            <span className="flex justify-between">Ships from <span className="text-black">Amazon</span></span>
                            <span className="flex justify-between">Sold by <span className="text-black">Appario Retail</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
