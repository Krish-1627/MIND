import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { movies } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import './Home.css';

const Home: React.FC = () => {
    const { setSelectedMovie, setTicketCount, selectedMovie } = useBooking();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const movieName = params.get('movie');
        const ticketCount = params.get('tickets');

        if (movieName && ticketCount) {
            const foundMovie = movies.find(m =>
                m.title.toLowerCase().includes(movieName.toLowerCase())
            );
            if (foundMovie) {
                setSelectedMovie(foundMovie);
                setTicketCount(parseInt(ticketCount));
            }
        }
    }, [location]);

    return (
        <div className="home-page fade-in">
            {/* Banner Mock */}
            <div className="banner-section">
                <div className="container">
                    <img
                        src="https://assets-in.bmscdn.com/promotions/cms/creatives/1706611593322_desktop.jpg"
                        alt="Promotion Banner"
                        className="promo-banner"
                    />
                </div>
            </div>

            <div className="container movie-section">
                <div className="section-header">
                    <h2>Recommended Movies</h2>
                    <span className="see-all">See All ›</span>
                </div>

                <div className="movie-grid">
                    {movies.map(movie => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className={`movie-card ${selectedMovie?.id === movie.id ? 'mind-selected' : ''}`}
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <div className="poster-wrapper">
                                <img src={movie.image} alt={movie.title} />
                                {selectedMovie?.id === movie.id && (
                                    <div className="mind-badge">MIND SELECTED</div>
                                )}
                                <div className="rating-badge">★ {movie.rating}/10 {movie.votes}</div>
                            </div>
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
