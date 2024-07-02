import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditCategory() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('id');

    const [formData, setFormData] = useState({
        CatName: '',
        CatCode: '',
        description: '',
        uploadedImage: null,
    });

    const getCategoryDetails = (itemId) => {
        let table = "categories";
        axios.post('get-item', { itemId, table })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        CatName: res.data.name,
                        CatCode: res.data.code,
                        description: res.data.description,
                        uploadedImage: null,
                    });

                } else {
                    console.log("Error fetching category details");
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCategoryDetails(categoryId);
    }, [categoryId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
        formDataToSubmit.append('id', categoryId);
        formDataToSubmit.append('name', formData.CatName);
        formDataToSubmit.append('code', formData.CatCode);
        formDataToSubmit.append('description', formData.description);
        
        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post('/update-category', formDataToSubmit, {
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
                            <h1> Edit Category </h1>
                            <h2> Update existing product category</h2>
                        </div>
                    </div>

                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Category Name </label>
                                        <input name='CatName' value={formData.CatName} onChange={handleInputChange} type='text' required />
                                    </div>
                                    <div className='input'>
                                        <label> Category Code </label>
                                        <input name='CatCode' value={formData.CatCode} onChange={handleInputChange} type='text' required />
                                    </div>
                                </div>

                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Description </label>
                                        <textarea name='description' value={formData.description} onChange={handleInputChange} required></textarea>
                                    </div>
                                </div>

                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Category Image </label>
                                        <div className='drag-drop-area' onDrop={handleDrop} onDragOver={handleDragOver}>
                                            {formData.uploadedImage ? (
                                                <img
                                                    src={URL.createObjectURL(formData.uploadedImage)}
                                                    alt='Uploaded'
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            ) : (
                                                <p>Drag and drop an image here or click to select</p>
                                            )}
                                        </div>
                                        <input type='file' onChange={(event) => setFormData({ ...formData, uploadedImage: event.target.files[0] })} />
                                    </div>
                                </div>

                                <div className='btns'>
                                    <button className='submit' type='submit'> Update </button>
                                    <button className='cancel' type='button'> Cancel </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCategory;