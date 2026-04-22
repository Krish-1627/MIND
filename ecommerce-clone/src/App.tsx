import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { ResultsPage } from './pages/ResultsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';

function App() {
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    {/* Main landing from MIND - expects ?search=... */}
                    <Route path="/" element={<ResultsPage />} />
                    <Route path="/search" element={<ResultsPage />} />

                    {/* Product Detail - expects ?quantity=... */}
                    <Route path="/product/:id" element={<ProductDetailPage />} />

                    {/* Store Flow */}
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                </Routes>
            </Router>
        </StoreProvider>
    );
}

export default App;
