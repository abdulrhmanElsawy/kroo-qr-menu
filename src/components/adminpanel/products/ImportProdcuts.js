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


function ImportProducts(){

    const [formData, setFormData] = useState({
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


return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1> Import Products </h1>
                            <h2> Bulk upload your products </h2>
                        </div>

                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Upload CSV File </label>
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
                                                    <p>Drag and drop a file to upload</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='required-options'>
                                    <table>
                                        
                                        <tr>
                                            <td><h5> Product Name </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> Category </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> SKU code </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> Product Cost </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> Product Price </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> Product Unit </h5></td>
                                            <td><h6> This Field is required </h6></td>
                                        </tr>
                                        <tr>
                                            <td><h5> Description </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>
                                    </table>


                                    <table>
                                    
                                    
                                        <tr>
                                            <td><h5> Minimum Qty </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                        <tr>
                                            <td><h5> Quantity </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                        <tr>
                                            <td><h5> Tax </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                        <tr>
                                            <td><h5> Discount Type </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                        <tr>
                                            <td><h5> Brand </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                        <tr>
                                            <td><h5> Minimum Qty </h5></td>
                                            <td><h6>  Field optional </h6></td>
                                        </tr>

                                    </table>


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

export default ImportProducts;