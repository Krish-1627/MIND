import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { movies, getTheatersForMovie } from '../data/mockData';
import type { Theater, Showtime } from '../data/mockData';
import { Clock, MapPin, Ticket, ChevronRight } from 'lucide-react';
import './MindSuggestions.css';

const MindSuggestions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setSelectedMovie, setTicketCount, addBooking } = useBooking();
    const [options, setOptions] = useState<{ theater: Theater, showtime: Showtime }[]>([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<any>(null);
    const [tickets, setTickets] = useState(2);

    useEffect(() => {
        try {
            const params = new URLSearchParams(location.search);
            const movieName = params.get('movie');
            const ticketCount = parseInt(params.get('tickets') || '2');

            const foundMovie = movies.find(m =>
                m.title.toLowerCase().includes((movieName || '').toLowerCase())
            ) || movies[0];

            if (foundMovie) {
                setSelectedMovie(foundMovie);
                setMovie(foundMovie);
                setTicketCount(ticketCount);
                setTickets(ticketCount);

                const movieTheaters = getTheatersForMovie(foundMovie.id);
                const suggestions: { theater: Theater, showtime: Showtime }[] = [];
                movieTheaters.forEach(t => {
                    t.showtimes.forEach(s => {
                        if (s.availability === 'Available' && suggestions.length < 3) {
                            suggestions.push({ theater: t, showtime: s });
                        }
                    });
                });
                setOptions(suggestions);
            }
        } catch (err) {
            console.error("Error in MindSuggestions:", err);
        } finally {
            setLoading(false);
        }
    }, [location]);

    if (loading) return <div className="suggestions-page container">Loading results...</div>;
    if (!movie) return <div className="suggestions-page container">Movie not found.</div>;

    const handleSelection = (theater: Theater, showtime: Showtime) => {
        try {
            // Dynamic seat picking: Choose from the best middle rows
            const bestRows = ['G', 'H', 'I', 'J', 'K'];
            const row = bestRows[Math.floor(Math.random() * bestRows.length)];
            const startCol = 8; // Middle column start
            const selectedSeats = Array.from({ length: tickets }, (_, i) => `${row}${startCol + i}`);

            const newBooking = {
                id: Math.random().toString(36).substr(2, 9),
                movie: movie,
                theater: theater,
                showtime: showtime,
                seats: selectedSeats,
                timestamp: new Date().toLocaleString()
            };

            addBooking(newBooking);
            navigate('/confirmation');
        } catch (err) {
            console.error("Selection error:", err);
        }
    };

    return (
        <div className="suggestions-page container fade-in">
            <div className="header-box">
                <div className="mind-logo-mini">MIND</div>
                <h1>MIND Orchestration Results</h1>
                <p>Found {options.length} best options for <strong>{movie.title}</strong> ({tickets} tickets)</p>
            </div>

            <div className="suggestions-grid">
                {options.map((opt: { theater: Theater, showtime: Showtime }, idx: number) => (
                    <div key={idx} className="suggestion-card" onClick={() => handleSelection(opt.theater, opt.showtime)}>
                        <div className="rank"># {idx + 1} Best Match</div>
                        <div className="card-body">
                            <div className="theater-header">
                                <MapPin size={16} className="icon" />
                                <h3>{opt.theater?.name || 'Theater'}</h3>
                            </div>
                            <div className="show-details">
                                <div className="detail">
                                    <Clock size={16} className="icon" />
                                    <span>{opt.showtime.time}</span>
                                </div>
                                <div className="detail">
                                    <Ticket size={16} className="icon" />
                                    <span>{opt.showtime.category} - Rs.{opt.showtime.price}</span>
                                </div>
                            </div>
                            <button className="select-btn">
                                Book This Option <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="manual-btn" onClick={() => navigate('/')}>
                I'll choose manually (Home Page)
            </button>
        </div>
    );
};

export default MindSuggestions;
