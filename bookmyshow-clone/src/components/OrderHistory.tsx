import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ShoppingBag, X, Calendar, MapPin, Ticket } from 'lucide-react';
import './OrderHistory.css';

const OrderHistory: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { bookings } = useBooking();

    return (
        <>
            <button className="history-trigger" onClick={() => setIsOpen(true)}>
                <ShoppingBag size={18} />
                <span>My Bookings ({bookings.length})</span>
            </button>

            {isOpen && (
                <div className="history-overlay">
                    <div className="history-modal fade-in">
                        <div className="modal-header">
                            <h2>Purchase History</h2>
                            <X className="close-icon" onClick={() => setIsOpen(false)} />
                        </div>

                        <div className="modal-body">
                            {bookings.length === 0 ? (
                                <div className="empty-state">
                                    <ShoppingBag size={48} className="icon" />
                                    <p>No bookings yet. MIND is waiting for your command!</p>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {bookings.map((order, idx) => (
                                        <div key={idx} className="order-card">
                                            <div className="card-left">
                                                <img src={order.movie.image} alt={order.movie.title} />
                                            </div>
                                            <div className="card-right">
                                                <h3>{order.movie.title}</h3>
                                                <p className="detail"><Calendar size={14} /> {order.timestamp}</p>
                                                <p className="detail"><MapPin size={14} /> {order.theater.name}</p>
                                                <p className="detail"><Ticket size={14} /> Seats: {order.seats.join(', ')}</p>
                                                <div className="status-badge">Confirmed</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderHistory;
