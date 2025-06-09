import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { fetchProductById, updateProduct, clearProductError, clearSuccessMessage } from '../features/products/productsSlice';

function EditProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedProduct, loading, error, successMessage } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (successMessage) {
            alert(successMessage);
            dispatch(clearSuccessMessage());
            navigate('/products'); // Redirect after successful update
        }
        if (error) {
            alert(`Error: ${error}`);
            dispatch(clearProductError());
        }
    }, [successMessage, error, dispatch, navigate]);

    const handleSubmit = (productData) => {
        dispatch(updateProduct({ id: productId, updatedProduct: productData }));
    };

    if (loading && !selectedProduct) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading product details...</p>;
    if (error && !selectedProduct) return <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</p>;
    if (!selectedProduct) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Product not found.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edit Product</h2>
            <ProductForm
                initialData={selectedProduct}
                onSubmit={handleSubmit}
                isLoading={loading}
                buttonText="Update Product"
            />
        </div>
    );
}

export default EditProductPage;