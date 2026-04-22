import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Menu } from 'lucide-react';
import OrderHistory from './OrderHistory';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="main-header">
            <div className="top-nav">
                <div className="container nav-content">
                    <div className="left-section">
                        <Link to="/" className="logo">
                            <img src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png" alt="BookMyShow" />
                        </Link>
                        <div className="search-container">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search for Movies, Events, Plays, Sports and Activities" />
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="location-picker">
                            <span>Bengaluru</span>
                            <ChevronDown size={14} />
                        </div>
                        <OrderHistory />
                        <button className="signin-btn">Sign in</button>
                        <Menu size={24} className="mobile-menu" />
                    </div>
                </div>
            </div>

            <nav className="bottom-nav">
                <div className="container sub-nav-content">
                    <div className="nav-links">
                        <a href="#">Movies</a>
                        <a href="#">Stream</a>
                        <a href="#">Events</a>
                        <a href="#">Plays</a>
                        <a href="#">Sports</a>
                        <a href="#">Activities</a>
                        <a href="#">Buzz</a>
                    </div>
                    <div className="nav-links right">
                        <a href="#">ListYourShow</a>
                        <a href="#">Corporates</a>
                        <a href="#">Offers</a>
                        <a href="#">Gift Cards</a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
