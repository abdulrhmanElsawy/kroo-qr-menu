import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditProduct() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [categories, setAllCategories] = useState([]);
    const [subCategories, setAllSubCategories] = useState([]);
    const [brands, setAllBrands] = useState([]);
    const [units, setAllUnits] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterdSubCategories, SetFilterdSubCategories] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        sub_category: '',
        brand: '',
        unit: '',
        sku: '',
        minimum_qty: '',
        quantity: '',
        description: '',
        tax: '',
        discount_type: '',
        price: '',
        status: '',
        uploadedImage: null,
    });

    const getAllCategories = () => {
        axios.post("AllItems", { table: "categories" })
            .then((res) => {
                if (res.data) {
                    setAllCategories(res.data);
                } else {
                    console.log("Error happened");
                }
            })
            .catch((err) => console.log(err));
    };

    const getAllSubCategories = () => {
        axios.post("AllItems", { table: "sub_categories" })
            .then((res) => {
                if (res.data) {
                    setAllSubCategories(res.data);
                } else {
                    console.log("Error happened");
                }
            })
            .catch((err) => console.log(err));
    };

    const getAllBrands = () => {
        axios.post("AllItems", { table: "brands" })
            .then((res) => {
                if (res.data) {
                    setAllBrands(res.data);
                } else {
                    console.log("Error happened");
                }
            })
            .catch((err) => console.log(err));
    };

    const getAllUnits = () => {
        axios.post("AllItems", { table: "units" })
            .then((res) => {
                if (res.data) {
                    setAllUnits(res.data);
                } else {
                    console.log("Error happened");
                }
            })
            .catch((err) => console.log(err));
    };

    const getProductDetails = (itemId) => {
        let table = "products";
        axios.post('get-item', { itemId, table })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        productName: res.data.name,
                        category: res.data.cat_id,
                        sub_category: res.data.sub_cat_id,
                        brand: res.data.brand,
                        unit: res.data.unit,
                        sku: res.data.sku,
                        minimum_qty: res.data.min_qty,
                        quantity: res.data.quantity,
                        description: res.data.description,
                        tax: res.data.tax,
                        discount_type: res.data.discount_type,
                        price: res.data.price,
                        status: res.data.status,
                        uploadedImage: null,
                    });
                    setSelectedCategory(res.data.cat_id);
                    const filteredSubCategories = subCategories.filter(subCategory => subCategory.cat_id === res.data.cat_id);
                    SetFilterdSubCategories(filteredSubCategories);
                } else {
                    console.log("Error fetching product details");
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllCategories();
        getAllSubCategories();
        getAllBrands();
        getAllUnits();
        getProductDetails(productId);
        
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectInputChange = (event) => {
        setSelectedCategory(event.target.value);
        const filteredSubCategories = subCategories.filter(subCategory => subCategory.cat_id === parseInt(event.target.value));
        SetFilterdSubCategories(filteredSubCategories);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFormData({
            ...formData,
            uploadedImage: file,
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('id', productId);
        formDataToSubmit.append('name', formData.productName);
        formDataToSubmit.append('cat_id', formData.category);
        formDataToSubmit.append('sub_cat_id', formData.sub_category);
        formDataToSubmit.append('brand', formData.brand);
        formDataToSubmit.append('unit', formData.unit);
        formDataToSubmit.append('sku', formData.sku);
        formDataToSubmit.append('min_qty', formData.minimum_qty);
        formDataToSubmit.append('quantity', formData.quantity);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('tax', formData.tax);
        formDataToSubmit.append('discount_type', formData.discount_type);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('status', formData.status);
        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post(`/update-product`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPopupMessage('Product updated successfully!');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            setPopupMessage('Error updating the product');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    return (
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>
                    <div className='page-header'>
                        <div className='text'>
                            <h1>Products Edit</h1>
                            <h2>Edit existing product</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Product Name</label>
                                        <input name='productName' value={formData.productName} onChange={handleInputChange} type='text' required />
                                    </div>
                                    <div className='input'>
                                        <label>Category</label>
                                        <select name='category' value={formData.category} onChange={(e) => { handleInputChange(e); handleSelectInputChange(e); }} required>
                                            <option value="">Choose Category</option>
                                            {categories.length > 0 ? (
                                                categories.map((category, index) => (
                                                    <option key={index} value={category.id}>{category.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No categories available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className='input'>
                                        <label>Sub Category</label>
                                        <select name='sub_category' value={formData.sub_category} onChange={handleInputChange} required >
                                            <option value="">Choose Sub Category</option>
                                            {filterdSubCategories.length > 0 ? (
                                                    filterdSubCategories.map((subCategory, index) => (
                                                        <option key={index} value={subCategory.id}>{subCategory.name}</option>
                                                    ))
                                                ) : (
                                                    subCategories.map((subCategory, index) => (
                                                        <option key={index} value={subCategory.id}>{subCategory.name}</option>
                                                    ))
                                                )}
                                        </select>
                                    </div>
                                    <div className='input'>
                                        <label>Brand</label>
                                        <select name='brand' value={formData.brand} onChange={handleInputChange} required>
                                            <option value="">Choose Brand</option>
                                            {brands.length > 0 ? (
                                                brands.map((brand, index) => (
                                                    <option key={index} value={brand.id}>{brand.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No Brands available</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Unit</label>
                                        <select name='unit' value={formData.unit} onChange={handleInputChange} required>
                                            <option value="">Choose Unit</option>
                                            {units.length > 0 ? (
                                                units.map((unit, index) => (
                                                    <option key={index} value={unit.id}>{unit.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No Units available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className='input'>
                                        <label>SKU</label>
                                        <input name='sku' value={formData.sku} onChange={handleInputChange} type='text' required />
                                    </div>
                                    <div className='input'>
                                        <label>Minimum Qty</label>
                                        <input name='minimum_qty' value={formData.minimum_qty} onChange={handleInputChange} type='number' required />
                                    </div>
                                    <div className='input'>
                                        <label>Quantity</label>
                                        <input name='quantity' value={formData.quantity} onChange={handleInputChange} type='number' required />
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Tax (%)</label>
                                        <input name='tax' value={formData.tax} onChange={handleInputChange} type='number' />
                                    </div>
                                    <div className='input'>
                                        <label>Discount Type</label>
                                        <input name='discount_type' value={formData.discount_type} placeholder="You don't have to add %" onChange={handleInputChange} type='number' required  />
                                    </div>
                                    <div className='input'>
                                        <label>Price</label>
                                        <input name='price' value={formData.price} onChange={handleInputChange} type='number' required />
                                    </div>
                                    <div className='input'>
                                        <label>Status</label>
                                        <select name='status' value={formData.status} onChange={handleInputChange} required>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Description</label>
                                        <textarea name='description' value={formData.description} onChange={handleInputChange}></textarea>
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Upload Product Image</label>
                                        <div className='drag-drop-area' onDragOver={handleDragOver} onDrop={handleDrop}>
                                            {formData.uploadedImage ? (
                                                <img
                                                    src={URL.createObjectURL(formData.uploadedImage)}
                                                    alt="Uploaded"
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            ) : (
                                                <img
                                                    src={`./uploads/${formData.img}`}
                                                    alt="Uploaded"
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            )}
                                        </div>
                                        <input type="file" onChange={(event) => setFormData({ ...formData, uploadedImage: event.target.files[0] })} />
                                    </div>
                                </div>
                                <div className='btns'>
                                    <button className='submit' type='submit'> Save </button>
                                    <button className='cancel' type='button'> Cancel </button>
                                </div>
                            </form>
                            {showPopup && (
                                <div className='popup'>
                                    <p>{popupMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;
