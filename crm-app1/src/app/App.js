import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Remove Link import
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProductManagementPage from '../pages/ProductManagementPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';
// import { logout } from '../features/auth/authSlice'; // This import is now handled by Header
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer

function App() {
    // const dispatch = useDispatch(); // Not directly used here anymore for logout
    // const { isLoggedIn } = useSelector((state) => state.auth); // Not directly used here anymore for logout button

    // const handleLogout = () => { // Move to Header
    //     dispatch(logout());
    // };

    return (
        <Router>
            <Header /> {/* Render the Header component here */}

            <main style={{ minHeight: 'calc(100vh - 120px)' }}> {/* Adjust minHeight based on header/footer height */}
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Private Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/products" element={<ProductManagementPage />} />
                        <Route path="/products/add" element={<AddProductPage />} />
                        <Route path="/products/edit/:productId" element={<EditProductPage />} />
                    </Route>

                    {/* Catch-all for undefined routes */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer /> {/* Render the Footer component here */}
        </Router>
    );
}

export default App;