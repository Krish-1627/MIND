import React from 'react';
import { Product } from '../data/products';
import { useNavigate } from 'react-router-dom';

interface Props {
    product: Product;
    quantity?: string;
}

export const ProductCard: React.FC<Props> = ({ product, quantity = '1' }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product.id}?quantity=${quantity}`)}
            className="flex flex-col bg-white p-4 cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1 border border-gray-100 h-full"
        >
            <div className="h-56 w-full flex items-center justify-center p-2 mb-4">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="flex-grow flex flex-col">
                <h3 className="text-sm font-medium line-clamp-3 mb-1 text-amazon_blue-light group-hover:text-orange-700">
                    {product.name}
                </h3>

                <div className="flex items-center mb-1">
                    <div className="flex text-amazon_yellow">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}>
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-xs ml-1 amazon-link">{product.reviewCount}</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[12px] align-top mt-1 font-medium">₹</span>
                        <span className="text-2xl font-bold">{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-[12px] text-gray-500 mt-1">
                        Get it by <span className="font-bold text-gray-700">Tomorrow, October 15</span>
                    </p>
                    <p className="text-[12px] text-gray-500">FREE Delivery by Amazon</p>
                </div>
            </div>
        </div>
    );
};
