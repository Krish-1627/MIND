import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Movie, Theater, Showtime } from '../data/mockData';

interface Booking {
    id: string;
    movie: Movie;
    theater: Theater;
    showtime: Showtime;
    seats: string[];
    timestamp: string;
}

interface BookingContextType {
    selectedMovie: Movie | null;
    setSelectedMovie: (movie: Movie | null) => void;
    selectedTheater: Theater | null;
    setSelectedTheater: (theater: Theater | null) => void;
    selectedShowtime: Showtime | null;
    setSelectedShowtime: (showtime: Showtime | null) => void;
    ticketCount: number;
    setTicketCount: (count: number) => void;
    selectedSeats: string[];
    setSelectedSeats: (seats: string[]) => void;
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    blockedSeats: Record<string, string[]>; // showtimeId -> list of seatIds
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
    const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
    const [ticketCount, setTicketCount] = useState<number>(0);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [blockedSeats, setBlockedSeats] = useState<Record<string, string[]>>({});

    const addBooking = (booking: Booking) => {
        setBookings(prev => [booking, ...prev]);
        // Block seats for the theater+showtime
        const key = `${booking.theater.id}_${booking.showtime.id}`;
        setBlockedSeats(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), ...booking.seats]
        }));
    };

    // Integration listener for MIND data (passed via URL/Params or a bridge)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const movieParam = params.get('movie');

        if (movieParam) {
            // Logic to auto-select movie and tickets will be handled in the component
        }
    }, []);

    return (
        <BookingContext.Provider value={{
            selectedMovie, setSelectedMovie,
            selectedTheater, setSelectedTheater,
            selectedShowtime, setSelectedShowtime,
            ticketCount, setTicketCount,
            selectedSeats, setSelectedSeats,
            bookings, addBooking,
            blockedSeats
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBooking must be used within BookingProvider');
    return context;
};
