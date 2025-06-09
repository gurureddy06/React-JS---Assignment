import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, clearSuccessMessage } from '../features/products/productsSlice';

function ProductManagementPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error, successMessage } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 3000); // Clear message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [successMessage, dispatch]);

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(productId));
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading products...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Product Management</h1>
            <Link to="/products/add" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px', display: 'inline-block', marginBottom: '20px' }}>
                Add New Product
            </Link>

            {successMessage && (
                <div style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                    {successMessage}
                </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={tableHeaderStyle}>ID</th>
                    <th style={tableHeaderStyle}>Title</th>
                    <th style={tableHeaderStyle}>Price</th>
                    <th style={tableHeaderStyle}>Category</th>
                    <th style={tableHeaderStyle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No products found.</td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableCellStyle}>{product.id}</td>
                            <td style={tableCellStyle}>{product.title}</td>
                            <td style={tableCellStyle}>${product.price}</td>
                            <td style={tableCellStyle}>{product.category}</td>
                            <td style={tableCellStyle}>
                                <Link to={`/products/edit/${product.id}`} style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Edit</Link>
                                <button onClick={() => handleDelete(product.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
};

export default ProductManagementPage;