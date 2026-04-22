import React from 'react';
import { Search, ShoppingCart, MapPin, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const AmazonHeader = () => {
    const { cart } = useStore();
    const navigate = useNavigate();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50">
            {/* Top Navy Bar */}
            <div className="bg-amazon_blue text-white flex items-center p-2 gap-4 h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center p-2 border border-transparent hover:border-white h-[50px] mt-2">
                    <img
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        alt="Amazon"
                        className="w-24 object-contain"
                    />
                    <span className="text-xs font-bold pt-1">.in</span>
                </Link>

                {/* Delivery Location */}
                <div className="hidden lg:flex flex-col p-2 border border-transparent hover:border-white cursor-pointer ml-4">
                    <span className="text-[12px] text-gray-300 ml-5 font-normal">Delivering to Bengaluru 560001</span>
                    <div className="flex items-center">
                        <MapPin size={18} className="mr-1 mt-[-4px]" />
                        <span className="text-sm font-bold">Update location</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-grow flex h-10 rounded-md overflow-hidden bg-white mx-2 group">
                    <div className="bg-gray-100 flex items-center px-3 text-amazon_blue text-[12px] cursor-pointer hover:bg-gray-200 border-r border-gray-300">
                        All <Menu size={14} className="ml-1" />
                    </div>
                    <input
                        type="text"
                        className="flex-grow p-2 focus:outline-none text-amazon_blue"
                        placeholder="Search Amazon.in"
                    />
                    <button className="bg-amazon_yellow hover:bg-amazon_yellow-hover p-2 px-4 flex items-center justify-center">
                        <Search className="text-amazon_blue font-bold" />
                    </button>
                </div>

                {/* Action Items */}
                <div className="flex items-center gap-4 px-2">
                    <div className="hidden md:flex flex-col p-2 border border-transparent hover:border-white cursor-pointer">
                        <span className="text-[12px] font-normal leading-3">Hello, sign in</span>
                        <span className="text-sm font-bold">Account & Lists</span>
                    </div>

                    <div onClick={() => navigate('/orders')} className="flex flex-col p-2 border border-transparent hover:border-white cursor-pointer">
                        <span className="text-[12px] font-normal leading-3">Returns</span>
                        <span className="text-sm font-bold">& Orders</span>
                    </div>

                    <div onClick={() => navigate('/cart')} className="flex items-center p-2 border border-transparent hover:border-white cursor-pointer relative">
                        <div className="relative">
                            <ShoppingCart size={32} />
                            <span className="absolute top-0 right-[-2px] bg-amazon_blue text-amazon_yellow font-bold text-center w-5 h-5 flex items-center justify-center rounded-full text-sm">
                                {cartCount}
                            </span>
                        </div>
                        <span className="hidden md:inline font-bold self-end mb-1 ml-1">Cart</span>
                    </div>
                </div>
            </div>

            {/* Sub Nav Bar */}
            <div className="bg-amazon_blue-light text-white flex items-center p-2 px-4 text-sm gap-4">
                <div className="flex items-center border border-transparent hover:border-white p-1 cursor-pointer font-bold">
                    <Menu size={20} className="mr-1" /> All
                </div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Fresh</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Amazon miniTV</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Sell</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Best Sellers</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Mobiles</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Today's Deals</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Prime</div>
                <div className="border border-transparent hover:border-white p-1 cursor-pointer">Customer Service</div>
                <div className="ml-auto hidden xl:block">
                    <img src="https://m.media-amazon.com/images/G/31/SM/SWM_T1_Xsite._CB421455581_.jpg" alt="Promo" className="h-8" />
                </div>
            </div>
        </header>
    );
};
