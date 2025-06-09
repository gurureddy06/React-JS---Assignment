import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { addProduct, clearProductError, clearSuccessMessage } from '../features/products/productsSlice';

function AddProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state) => state.products);

    const handleSubmit = (productData) => {
        dispatch(addProduct(productData));
    };

    useEffect(() => {
        if (successMessage) {
            alert(successMessage);
            dispatch(clearSuccessMessage());
            navigate('/products'); // Redirect to product list after successful add
        }
        if (error) {
            alert(`Error: ${error}`);
            dispatch(clearProductError());
        }
    }, [successMessage, error, dispatch, navigate]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add New Product</h2>
            <ProductForm onSubmit={handleSubmit} isLoading={loading} buttonText="Add Product" />
        </div>
    );
}

export default AddProductPage;