import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // For Pie chart
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function DashboardPage() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });
    const [priceRangeData, setPriceRangeData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (products.length === 0 && !loading && !error) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length, loading, error]);

    useEffect(() => {
        if (products.length > 0) {
            // Process data for Category Distribution (Pie Chart)
            const categories = {};
            products.forEach(product => {
                categories[product.category] = (categories[product.category] || 0) + 1;
            });

            setCategoryData({
                labels: Object.keys(categories),
                datasets: [
                    {
                        label: 'Products by Category',
                        data: Object.values(categories),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(199, 199, 199, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });

            // Process data for Price Range Distribution (Bar Chart)
            const priceRanges = {
                '0-50': 0,
                '51-100': 0,
                '101-200': 0,
                '201-500': 0,
                '501+': 0,
            };

            products.forEach(product => {
                if (product.price <= 50) priceRanges['0-50']++;
                else if (product.price <= 100) priceRanges['51-100']++;
                else if (product.price <= 200) priceRanges['101-200']++;
                else if (product.price <= 500) priceRanges['201-500']++;
                else priceRanges['501+']++;
            });

            setPriceRangeData({
                labels: Object.keys(priceRanges),
                datasets: [
                    {
                        label: 'Products by Price Range',
                        data: Object.values(priceRanges),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [products]);


    if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading dashboard data...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                    <h3>Products by Category</h3>
                    {categoryData.labels.length > 0 ? (
                        <Pie data={categoryData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Product Categories' } } }} />
                    ) : (
                        <p>No category data available.</p>
                    )}
                </div>

                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                    <h3>Products by Price Range</h3>
                    {priceRangeData.labels.length > 0 ? (
                        <Bar data={priceRangeData} options={{ responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Product Price Distribution' } }, scales: { y: { beginAtZero: true } } }} />
                    ) : (
                        <p>No price range data available.</p>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3>Overall Metrics</h3>
                <p>Total Products: {products.length}</p>
                {/* You can add more metrics here */}
            </div>
        </div>
    );
}

export default DashboardPage;