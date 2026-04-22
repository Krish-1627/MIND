import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

interface OrderItem {
    product: Product;
    quantity: number;
}

interface Order {
    id: string;
    items: OrderItem[];
    date: string;
    total: number;
    deliveryEstimate?: string;
}

interface StoreContextType {
    cart: OrderItem[];
    addToCart: (product: Product, quantity: number) => void;
    orders: Order[];
    placeOrder: (items: OrderItem[], deliveryEstimate?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<OrderItem[]>(() => {
        const saved = localStorage.getItem('amazon_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem('amazon_orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('amazon_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('amazon_orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product: Product, quantity: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    };

    const placeOrder = (items: OrderItem[], deliveryEstimate?: string) => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const newOrder: Order = {
            id: Math.random().toString(36).substring(2, 10).toUpperCase(),
            items: [...items],
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            total,
            deliveryEstimate
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]); // Clear cart after order
    };

    return (
        <StoreContext.Provider value={{ cart, addToCart, orders, placeOrder }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within StoreProvider');
    return context;
};
