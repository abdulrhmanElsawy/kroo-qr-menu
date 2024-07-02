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


function AddLandingImage(){

    const [formData, setFormData] = useState({
        img: null, 
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
        img: file,
        });
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();

        
        if (formData.img) {
            formDataToSubmit.append('img', formData.img);
        }

        try {
            const response = await axios.post('/add-new-landing-image', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Process the response further as needed
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };



return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1>اضافة صورة للمطعم </h1>
                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>




                                <div className='inputs'>
                                    <div className='input'>
                                        <label> الصورة </label>
                                        <div
                                            className='drag-drop-area'
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            {formData.img ? (
                                                <img
                                                    src={URL.createObjectURL(formData.img)}
                                                    alt='Uploaded'
                                                    style={{ width: '100px', height: '100px' }}
                                                />
                                            ) : (
                                                <p> قم بسحب صورة الى هنا يفضل ان تكون 1200 x 500 </p>
                                            )}
                                            <input type='file' onChange={(event) => setFormData({ ...formData, img: event.target.files[0] })} />
                                        </div>
                                    </div>
                                </div>



                                <div className='btns'>
                                    <button className='submit' type='submit'> إضافة </button>
                                </div>


                            </form>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

export default AddLandingImage;