import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import MindSuggestions from './pages/MindSuggestions';
import Header from './components/Header';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/mind-suggestions" element={<MindSuggestions />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
