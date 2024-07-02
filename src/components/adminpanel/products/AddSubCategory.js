import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';

import ProductImg1 from '../images/products/1_0.webp';
import ProductImg2 from '../images/products/2_1.webp';
import ProductImg3 from '../images/products/3_2.webp';
import ProductImg4 from '../images/products/4_3.webp';
import ProductImg5 from '../images/products/5_4.webp';
import ProductImg6 from '../images/products/6_5.webp';
import $ from "jquery"; // Import jQuery if not already imported


import axios from '../../../config/index'; // Adjust the import path as needed


function AddSubCategory(){

    const [formData, setFormData] = useState({
        ParentCat: '',
        CatName: '',
        CatCode:'',
        Description:'',
        uploadedImage: null, 
    });

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
    
        // Update the state with the uploaded image file
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
        formDataToSubmit.append('cat_id', formData.ParentCat);
        formDataToSubmit.append('name', formData.CatName);
        formDataToSubmit.append('code', formData.CatCode);
        formDataToSubmit.append('description', formData.Description);
        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post('/add-new-sub-category', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Process the response further as needed
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };


    const [categories, setAllCategories] = useState([]);

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


    
    useEffect(() => {
        getAllCategories();

    }, []);




return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1>  Add Sub Category </h1>
                            <h2> Create new sub category</h2>
                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Parent Category </label>
                                        <select name='ParentCat' onChange={handleInputChange} required>
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
                                        <label> Sub Category Name </label>
                                        <input name='CatName' onChange={handleInputChange} type='text' required  />
                                    </div>

                                    <div className='input'>
                                        <label> Sub Category Code </label>
                                        <input name='CatCode' onChange={handleInputChange} type='text' required  />
                                    </div>


                                </div>



                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Description </label>
                                        <textarea name='Description' onChange={handleInputChange} type='text' required></textarea>
                                    </div>
                                </div>



                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Sub Category Image </label>
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
                                                    <i class="las la-cloud-upload-alt"></i>
                                                    <p>Drag and drop an image here</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>



                                <div className='btns'>
                                    <button className='submit' type='submit'> Submit </button>
                                    <button className='cancel' type='button'> Cancel </button>
                                </div>


                            </form>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

export default AddSubCategory;