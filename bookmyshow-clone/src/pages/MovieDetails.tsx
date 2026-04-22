import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies, getTheatersForMovie } from '../data/mockData';
import type { Theater, Showtime } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { Heart, Info } from 'lucide-react';
import './MovieDetails.css';

const MovieDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setSelectedTheater, setSelectedShowtime } = useBooking();
    const [movie] = useState(movies.find(m => m.id === id) || movies[0]);
    const [suggestedTheaters, setSuggestedTheaters] = useState<Theater[]>([]);

    useEffect(() => {
        setSuggestedTheaters(getTheatersForMovie(movie.id));
    }, [movie.id]);

    const handleShowtimeClick = (theater: Theater, showtime: Showtime) => {
        setSelectedTheater(theater);
        setSelectedShowtime(showtime);
        navigate('/seat-selection');
    };

    return (
        <div className="movie-details-page fade-in">
            <div className="hero-banner" style={{ backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movie.backdrop})` }}>
                <div className="container hero-content">
                    <div className="poster-main">
                        <img src={movie.image} alt={movie.title} />
                    </div>
                    <div className="info-main">
                        <h1>{movie.title}</h1>
                        <div className="rating-row">
                            <span className="star">★</span>
                            <span className="score">{movie.rating}/10</span>
                            <span className="votes">({movie.votes} Votes)</span>
                            <button className="rate-now">Rate now</button>
                        </div>
                        <div className="format-chips">
                            <span>2D, IMAX 2D</span>
                            <span>{movie.language}</span>
                        </div>
                        <div className="meta-text">
                            {movie.duration} • {movie.genre} • UA • 1 Dec, 2023
                        </div>
                        <button className="book-btn-main">Book tickets</button>
                    </div>
                </div>
            </div>

            <div className="container booking-section">
                <div className="date-selector">
                    <div className="date-chip active">
                        <span className="day">THU</span>
                        <span className="num">05</span>
                        <span className="month">DEC</span>
                    </div>
                    <div className="date-chip">
                        <span className="day">FRI</span>
                        <span className="num">06</span>
                        <span className="month">DEC</span>
                    </div>
                    <div className="date-chip">
                        <span className="day">SAT</span>
                        <span className="num">07</span>
                        <span className="month">DEC</span>
                    </div>
                </div>

                <div className="theater-listings">
                    {suggestedTheaters.map(theater => (
                        <div key={theater.id} className="theater-card">
                            <div className="theater-info">
                                <Heart size={18} className="heart-icon" />
                                <div className="name-loc">
                                    <h3>{theater.name}</h3>
                                    <p><Info size={14} /> INFO • {theater.distance} away</p>
                                </div>
                            </div>
                            <div className="showtimes-grid">
                                {theater.showtimes.map(st => (
                                    <button
                                        key={st.id}
                                        className={`showtime-chip ${st.availability.replace(' ', '-').toLowerCase()}`}
                                        onClick={() => handleShowtimeClick(theater, st)}
                                    >
                                        <div className="time">{st.time}</div>
                                        <div className="cat">{st.category}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
