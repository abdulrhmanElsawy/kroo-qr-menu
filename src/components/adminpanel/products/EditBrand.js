import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditBrand() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const brandId = queryParams.get('id');

    const [formData, setFormData] = useState({
        BrandName: '',
        description: '',
        uploadedImage: null,
    });

    useEffect(() => {
        getBrandDetails(brandId);
    }, [brandId]);

    const getBrandDetails = (id) => {
        axios.post('get-item', { itemId: id, table: 'brands' })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        BrandName: res.data.name, // Correctly map the API response to the state
                        description: res.data.description,
                        uploadedImage: null, // Reset uploadedImage as we won't have it from the API response
                    });
                } else {
                    console.log("Error fetching brand details");
                }
            })
            .catch((err) => console.log(err));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            uploadedImage: file,
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('id', brandId);
        formDataToSubmit.append('name', formData.BrandName);
        formDataToSubmit.append('description', formData.description);

        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post('/update-brand', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Process the response further as needed
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>
                    <div className='page-header'>
                        <div className='text'>
                            <h1>Brand Edit</h1>
                            <h2>Edit existing Brand</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Brand Name</label>
                                        <input name='BrandName' value={formData.BrandName} onChange={handleInputChange} type='text' required />
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Description</label>
                                        <textarea name='description' value={formData.description} onChange={handleInputChange} type='text' required></textarea>
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Brand Image</label>
                                        <div
                                            className='drag-drop-area'
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            {formData.uploadedImage ? (
                                                <img
                                                    src={URL.createObjectURL(formData.uploadedImage)}
                                                    alt='Uploaded'
                                                />
                                            ) : (
                                                <>
                                                    <i className="las la-cloud-upload-alt"></i>
                                                    <p>Drag and drop an image here</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='btns'>
                                    <button className='submit' type='submit'>Save</button>
                                    <button className='cancel' type='button'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBrand;