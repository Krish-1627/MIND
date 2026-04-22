import React from 'react';
import { useStore } from '../context/StoreContext';
import { AmazonHeader } from '../components/AmazonHeader';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export const CartPage = () => {
    const { cart, placeOrder } = useStore();
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        placeOrder(cart);
        navigate('/orders');
    };

    return (
        <div className="min-h-screen bg-[#eaeded]">
            <AmazonHeader />

            <div className="max-w-[1500px] mx-auto p-4 flex flex-col lg:flex-row gap-6">
                {/* Left Side: Cart Items */}
                <div className="flex-grow bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-medium border-b pb-4 mb-6">Shopping Cart</h1>

                    {cart.length === 0 ? (
                        <div className="py-10 text-center">
                            <h2 className="text-xl font-bold mb-2">Your Amazon Cart is empty.</h2>
                            <p className="text-amazon_link">MIND orchestration is waiting for your command!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-4 border-b pb-6">
                                    <div className="w-44 h-44 flex-shrink-0">
                                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-medium line-clamp-2">{item.product.name}</h3>
                                            <span className="text-xl font-bold">₹{item.product.price.toLocaleString('en-IN')}</span>
                                        </div>
                                        <p className="text-xs text-[#007600] mb-2 font-medium">In stock</p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-700">
                                            <span className="bg-gray-100 border px-3 py-1 rounded shadow-sm">Qty: {item.quantity}</span>
                                            <span className="text-amazon_link border-l pl-4">Delete</span>
                                            <span className="text-amazon_link border-l pl-4">Save for later</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="text-right pt-2">
                                <span className="text-lg">Subtotal ({count} items): <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Checkout Box */}
                <div className="lg:w-[300px] flex-shrink-0">
                    <div className="bg-white p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#067D62] text-xs">
                            <CheckCircle2 size={24} className="fill-current text-[#067D62] bg-white rounded-full bg-none" />
                            <span>Your order is eligible for FREE Delivery. Select this option at checkout.</span>
                        </div>

                        <div className="text-lg mb-2">
                            Subtotal ({count} items): <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex gap-2 items-center text-sm">
                            <input type="checkbox" id="gift" />
                            <label htmlFor="gift">This order contains a gift</label>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            onClick={handleCheckout}
                            className={`amazon-button w-full py-2 ${cart.length === 0 ? 'opacity-50 grayscale' : ''}`}
                        >
                            Proceed to Buy
                        </button>

                        <div className="border rounded-md mt-4 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                            <span className="text-sm font-medium">EMI available</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
