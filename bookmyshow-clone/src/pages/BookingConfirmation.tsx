import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, Calendar, MapPin } from 'lucide-react';
import './BookingConfirmation.css';

const BookingConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const {
        selectedMovie, selectedTheater, selectedShowtime,
        selectedSeats, addBooking
    } = useBooking();

    useEffect(() => {
        if (!selectedMovie || selectedSeats.length === 0) {
            navigate('/');
            return;
        }

        const newBooking = {
            id: Math.random().toString(36).substr(2, 9),
            movie: selectedMovie,
            theater: selectedTheater!,
            showtime: selectedShowtime!,
            seats: selectedSeats,
            timestamp: new Date().toLocaleString()
        };
        addBooking(newBooking);
    }, []);

    return (
        <div className="confirmation-page container fade-in">
            <div className="success-banner">
                <CheckCircle size={64} className="success-icon" />
                <h1>Booking Confirmed!</h1>
                <p>Your tickets have been sent to your email and phone.</p>
            </div>

            <div className="ticket-card">
                <div className="ticket-header">
                    <img src={selectedMovie?.image} alt={selectedMovie?.title} className="mini-poster" />
                    <div className="movie-details">
                        <h2>{selectedMovie?.title}</h2>
                        <p className="lang">Hindi | 2D</p>
                        <p className="meta">UA | {selectedMovie?.duration}</p>
                    </div>
                </div>

                <div className="ticket-info">
                    <div className="info-item">
                        <Calendar size={18} />
                        <div>
                            <span>Date & Time</span>
                            <p>Thu, 05 Dec | {selectedShowtime?.time}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <MapPin size={18} />
                        <div>
                            <span>Cinema</span>
                            <p>{selectedTheater?.name}</p>
                        </div>
                    </div>
                </div>

                <div className="seats-section">
                    <div className="seats-info">
                        <span>Seats</span>
                        <p>{selectedSeats.join(', ')}</p>
                    </div>
                    <div className="price-info">
                        <span>Amount Paid</span>
                        <p>Rs.{(selectedShowtime?.price || 0) * selectedSeats.length}.00</p>
                    </div>
                </div>

                <div className="ticket-footer">
                    <div className="qr-box">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BMS-BOOKING" alt="QR Code" />
                    </div>
                    <div className="booking-id">
                        <span>Booking ID</span>
                        <p>BMS{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                    </div>
                </div>
            </div>

            <button className="home-btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default BookingConfirmation;
