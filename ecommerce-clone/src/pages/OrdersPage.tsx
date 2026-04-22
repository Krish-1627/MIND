import React from 'react';
import { useStore } from '../context/StoreContext';
import { AmazonHeader } from '../components/AmazonHeader';
import { useNavigate } from 'react-router-dom';

export const OrdersPage = () => {
    const { orders } = useStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <AmazonHeader />

            <div className="max-w-[1000px] mx-auto p-4 md:p-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">Your Account</span>
                    <span>›</span>
                    <span className="text-[#C45500]">Your Orders</span>
                </div>

                <h1 className="text-3xl font-medium mb-6">Your Orders</h1>

                <div className="flex border-b border-gray-300 mb-6 gap-8 text-sm font-medium text-gray-600 pb-3 overflow-x-auto whitespace-nowrap">
                    <span className="text-gray-900 border-b-2 border-[#C45500] pb-2">Orders</span>
                    <span>Buy Again</span>
                    <span>Not Yet Shipped</span>
                    <span>Cancelled Orders</span>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white p-10 text-center border rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">You haven't placed any orders yet.</h2>
                        <button onClick={() => navigate('/')} className="amazon-button">Continue Shopping</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                {/* Order Header */}
                                <div className="bg-[#f0f2f2] p-4 px-6 border-b flex flex-wrap justify-between items-center gap-4 text-xs">
                                    <div className="flex gap-10">
                                        <div className="flex flex-col gap-1">
                                            <span className="uppercase text-gray-500">Order Placed</span>
                                            <span className="text-gray-700 font-medium">{order.date}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="uppercase text-gray-500">Total</span>
                                            <span className="text-gray-700 font-medium">₹{order.total.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="uppercase text-gray-500">Ship To</span>
                                            <span className="amazon-link font-medium">MIND Demo User</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="uppercase text-gray-500">Order # {order.id}</span>
                                        <div className="flex gap-2">
                                            <span className="amazon-link">View order details</span>
                                            <span className="text-gray-300">|</span>
                                            <span className="amazon-link">Invoice</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 space-y-6">
                                    <h3 className="text-lg font-bold text-[#007600]">Arriving {order.deliveryEstimate || 'Tomorrow'}</h3>
                                    <p className="text-sm text-gray-600 mt-[-15px]">Your package is being prepared for dispatch</p>

                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-6">
                                            <div className="w-24 h-24 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.product.id}`)}>
                                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-sm font-medium amazon-link line-clamp-2" onClick={() => navigate(`/product/${item.product.id}`)}>
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 italic">Returning eligible through 30 Oct 2026</p>
                                                <div className="mt-4 flex flex-wrap gap-2 items-center">
                                                    <button className="amazon-button py-1 text-xs px-6 shadow-md border-gray-400">Buy it again</button>
                                                    <button className="bg-white border border-gray-300 rounded-lg py-1 px-4 text-xs font-medium hover:bg-gray-50">View your item</button>
                                                </div>
                                            </div>
                                            <div className="hidden md:flex flex-col gap-2 w-48 font-medium">
                                                <button className="w-full amazon-button-orange py-1.5 text-xs">Track package</button>
                                                <button className="w-full bg-white border border-gray-300 rounded-lg py-1.5 text-xs">Return items</button>
                                                <button className="w-full bg-white border border-gray-300 rounded-lg py-1.5 text-xs">Write a product review</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t p-4 px-6 text-sm">
                                    <span className="amazon-link">Archive order</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
