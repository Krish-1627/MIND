import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ChevronLeft, X } from 'lucide-react';
import './SeatSelection.css';

const ROWS = ['M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
const COLS = Array.from({ length: 20 }, (_, i) => i + 1);

const SeatSelection: React.FC = () => {
    const navigate = useNavigate();
    const {
        selectedMovie, selectedTheater, selectedShowtime,
        ticketCount, setSelectedSeats,
        blockedSeats
    } = useBooking();

    const [localSelected, setLocalSelected] = useState<string[]>([]);
    const blockKey = `${selectedTheater?.id}_${selectedShowtime?.id}`;
    const currentlyBlocked = blockedSeats[blockKey] || [];

    useEffect(() => {
        if (!selectedMovie || !selectedShowtime) {
            navigate('/');
            return;
        }

        if (ticketCount > 0) {
            autoPickSeats(ticketCount);
        }
    }, []);

    const autoPickSeats = (count: number) => {
        // Priority rows from middle towards back/front
        const preferredRows = ['H', 'I', 'G', 'J', 'F', 'K', 'E', 'L', 'D'];

        // Shuffle preferred rows slightly for demo variety
        const shuffledRows = [...preferredRows].sort(() => Math.random() - 0.5);

        let found = false;

        for (const row of shuffledRows) {
            if (found) break;

            // Priority columns: Start from middle (col 8-12 area) and expand
            const colStartPreferences = [8, 9, 7, 10, 6, 11, 5];

            for (const startCol of colStartPreferences) {
                if (startCol + count > 21) continue; // Out of bounds

                const candidateSeats = [];
                let allAvailable = true;

                for (let i = 0; i < count; i++) {
                    const seatId = `${row}${startCol + i}`;
                    if (currentlyBlocked.includes(seatId) || startCol + i > 20) {
                        allAvailable = false;
                        break;
                    }
                    candidateSeats.push(seatId);
                }

                if (allAvailable) {
                    setLocalSelected(candidateSeats);
                    setSelectedSeats(candidateSeats);
                    found = true;
                    break;
                }
            }
        }
    };

    const handleSeatClick = (seatId: string) => {
        if (currentlyBlocked.includes(seatId)) return;

        if (localSelected.includes(seatId)) {
            setLocalSelected(prev => prev.filter(s => s !== seatId));
        } else {
            if (localSelected.length < ticketCount) {
                setLocalSelected(prev => [...prev, seatId]);
            }
        }
    };

    const handleBook = () => {
        setSelectedSeats(localSelected);
        navigate('/confirmation');
    };

    return (
        <div className="seat-selection-page fade-in">
            <div className="seat-header">
                <div className="container header-inner">
                    <div className="left">
                        <ChevronLeft onClick={() => navigate(-1)} className="back-icon" />
                        <div className="movie-mini-info">
                            <h4>{selectedMovie?.title}</h4>
                            <p>{selectedTheater?.name} | Today, 05 Dec, {selectedShowtime?.time}</p>
                        </div>
                    </div>
                    <div className="right">
                        <span className="ticket-count-badge">{ticketCount} Tickets</span>
                        <X onClick={() => navigate('/')} className="close-icon" />
                    </div>
                </div>
            </div>

            <div className="grid-container">
                <div className="screen-indicator">
                    <div className="screen-curve"></div>
                    <p>All eyes this way!</p>
                </div>

                <div className="seat-grid">
                    {ROWS.map(row => (
                        <div key={row} className="seat-row">
                            <span className="row-label">{row}</span>
                            <div className="seats">
                                {COLS.map(col => {
                                    const seatId = `${row}${col}`;
                                    const isBlocked = currentlyBlocked.includes(seatId);
                                    const isSelected = localSelected.includes(seatId);
                                    const isGap = col === 5 || col === 16;

                                    return (
                                        <React.Fragment key={seatId}>
                                            {isGap && <div className="seat-gap"></div>}
                                            <div
                                                className={`seat ${isBlocked ? 'blocked' : ''} ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleSeatClick(seatId)}
                                            >
                                                {col}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="legend">
                    <div className="item"><div className="box available"></div> Available</div>
                    <div className="item"><div className="box selected"></div> Selected</div>
                    <div className="item"><div className="box blocked"></div> Sold</div>
                </div>
            </div>

            <div className="footer-action">
                <div className="container footer-inner">
                    <button className="book-now-btn" onClick={handleBook} disabled={localSelected.length === 0}>
                        Pay Rs.{(selectedShowtime?.price || 0) * localSelected.length}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
