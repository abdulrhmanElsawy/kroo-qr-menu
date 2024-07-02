import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditSubCategory() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subCategoryId = queryParams.get('id');

    const [formData, setFormData] = useState({
        ParentCat: '',
        CatName: '',
        CatCode: '',
        Description: '',
        uploadedImage: null,
    });

    const [categories, setAllCategories] = useState([]);

    useEffect(() => {
        getAllCategories();
        getSubCategoryDetails(subCategoryId);
    }, [subCategoryId]);

    const getSubCategoryDetails = (id) => {
        axios.post('get-item', { itemId: id, table: 'sub_categories' })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        ParentCat: res.data.cat_id,
                        CatName: res.data.name,
                        CatCode: res.data.code,
                        Description: res.data.description,
                        uploadedImage: null,
                    });


                } else {
                    console.log("Error fetching sub-category details");
                }
            })
            .catch((err) => console.log(err));
    };

    const getAllCategories = () => {
        axios.post("AllItems", {
            table: "categories",
        })
        .then((res) => {
            if (res.data) {
                setAllCategories(res.data);
                console.log(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };

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
        formDataToSubmit.append('id', subCategoryId);
        formDataToSubmit.append('parentCatId', formData.ParentCat);
        formDataToSubmit.append('name', formData.CatName);
        formDataToSubmit.append('code', formData.CatCode);
        formDataToSubmit.append('description', formData.Description);
        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post('/update-sub-category', formDataToSubmit, {
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
                            <h1>Edit Sub Category</h1>
                            <h2>Edit existing sub category</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Parent Category</label>
                                        <select name='ParentCat' value={formData.ParentCat} onChange={handleInputChange} required>
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
                                        <label>Sub Category Name</label>
                                        <input name='CatName' value={formData.CatName} onChange={handleInputChange} type='text' required />
                                    </div>
                                    <div className='input'>
                                        <label>Sub Category Code</label>
                                        <input name='CatCode' value={formData.CatCode} onChange={handleInputChange} type='text' required />
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Description</label>
                                        <textarea name='Description' value={formData.Description} onChange={handleInputChange} type='text' required></textarea>
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Sub Category Image</label>
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

export default EditSubCategory;