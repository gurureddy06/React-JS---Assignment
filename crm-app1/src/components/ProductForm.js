import React, { useState, useEffect } from 'react';

function ProductForm({ initialData = {}, onSubmit, isLoading, buttonText }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        category: initialData.category || '',
        brand: initialData.brand || '',
        thumbnail: initialData.thumbnail || 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', // Default thumbnail
    });

    useEffect(() => {
        // Update form data if initialData changes (example, when editing)
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                description: initialData.description || '',
                category: initialData.category || '',
                brand: initialData.brand || '',
                thumbnail: initialData.thumbnail || 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    style={inputStyle}
                ></textarea>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="brand">Brand:</label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle} htmlFor="thumbnail">Thumbnail URL:</label>
                <input
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>
            <button type="submit" disabled={isLoading} style={buttonStyle}>
                {isLoading ? 'Saving...' : buttonText}
            </button>
        </form>
    );
}

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

export default ProductForm;