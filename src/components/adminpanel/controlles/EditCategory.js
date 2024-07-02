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
        name: '',
        uploadedImage: null,
    });

    const getCategoryDetails = (itemId) => {
        let table = "categories";
        axios.post('get-item', { itemId, table })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        name: res.data.name,
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
        formDataToSubmit.append('name', formData.name);
        
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
                            <h1> تعديل القسم</h1>
                        </div>
                    </div>

                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>  الاسم </label>
                                        <input name='name' value={formData.name} onChange={handleInputChange} type='text' required />
                                    </div>
                                    
                                </div>

                            

                                <div className='inputs'>
                                    <div className='input'>
                                        <label> الصورة </label>
                                        <div className='drag-drop-area' onDrop={handleDrop} onDragOver={handleDragOver}>
                                        {formData.img ? (
                                                <img
                                                    src={URL.createObjectURL(formData.img)}
                                                    alt='Uploaded'
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            ) : (
                                                <p> قم بسحب صورة الى هنا يفضل ان تكون 800 x 500 </p>
                                            )}
                                            <input type='file' onChange={(event) => setFormData({ ...formData, img: event.target.files[0] })} />
                                        </div>
                                    </div>
                                </div>

                                <div className='btns'>
                                    <button className='submit' type='submit'> تحديث </button>
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