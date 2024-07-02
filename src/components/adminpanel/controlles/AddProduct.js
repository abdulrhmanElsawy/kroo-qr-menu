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
import axios2 from '../../../config/index2'; // Adjust the import path as needed

function AddProduct(){

    const [userId, setUserId] = useState(0);



    useEffect(() => {
        const fetchSessionData = async () => {


            try {
                const response = await axios.get('/session');

                if (response.data && response.data.valid) {
                    setUserId(response.data.userId)
                } else {
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchSessionData();
    }, []); 

    
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');





        
    const [categories, setAllCategories] = useState([]);
    const [features, setAllFeatures] = useState([]);

    const getAllFeatures = () => {
        axios.post("AllItems", {
            table: "product_features",
        })
        .then((res) => {
            if (res.data) {
                setAllFeatures(res.data);
            } else {
                console.log("Error happened");
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
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };









    useEffect(() => {
        getAllFeatures();

    }, []);



    
    const [selectedCategory, setSelectedCategory] = useState('');

    const [filterdSubCategories, SetFilterdSubCategories] = useState([]);


    const [formData, setFormData] = useState({
        name: '',
        price: '',
        integ:'',
        brand:'',
        cat_id: '',
        feature_ids: '',
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
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('integ', formData.integ);
        formDataToSubmit.append('cat_id', formData.cat_id);
        formDataToSubmit.append('feature_ids', formData.feature_ids);
        if (formData.uploadedImage) {
            formDataToSubmit.append('img', formData.uploadedImage);
        }

        try {
            const response = await axios.post('/add-new-product', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Show success popup
            setPopupMessage('تم إضافة المنتج الى القائمة ');
            setShowPopup(true);
            function clearForm() {
                var forms = document.getElementsByTagName('form');
                for (var i = 0; i < forms.length; i++) {
                    forms[i].reset();
                }
            }

            clearForm();
            // Hide the popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);


            // Clear form data

            setFormData({
                name: '',
                price: '',
                integ:'',
                brand:'',
                cat_id: '',
                feature_ids: '',
                uploadedImage: null, 
            });
        } catch (error) {
            // Show error popup
            setPopupMessage('Error submitting the form');
            setShowPopup(true);

                // Hide the popup after 3 seconds
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
        }
    };





return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1> إضافة منتج   </h1>

                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>


                                <div className='inputs'>
                                    
                                    <div className='input'>
                                        <label> اسم المنتج </label>
                                        <input name='productName' onChange={handleInputChange} type='text' required  />
                                    </div>

                                    <div className='input'>
                                        <label> القسم </label>
                                        <select 
                                                
                                                name='category' 
                                                onChange={(e) => { handleInputChange(e); handleSelectInputChange(e); }} 
                                                required
                                            >
                                                <option value=""> إختر القسم </option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                            
                                    </div>


                                    
                                    <div className='input'>
                                        <label> السعر </label>
                                        <input name='price' onChange={handleInputChange} type='float' required  />
                                    </div>


                                    <div className='input'>
                                        <label> المكونات (يرجى إضافة فاصلة بين كل مكون) </label>
                                        <input name='integ' placeholder=' المكونات مثال : لحم ,  خبز ,  خص '  onChange={handleInputChange} type='text' />
                                    </div>


                                </div>



                                <div className='inputs'>
                                    

                                    <div className='input'>
                                        <label>  الإضافات </label>
                                        <select name='unit' onChange={handleInputChange} required >
                                        <option value=""> إختر نوع الإضافة </option>

                                            {features.length > 0 ? (
                                                        features.map((feature, index) => (
                                                            <option key={index} value={feature.id}>{feature.name}</option>
                                                        ))
                                                    ) : (
                                                        <option value=""> لا يوجد اي اضافات </option>
                                                )}
                                        </select>
                                    </div>
                                    

                                    <div className='input'>
                                        <label> SKU </label>
                                        <input name='sku' onChange={handleInputChange} type='text' required  />
                                    </div>

                                    <div className='input'>
                                        <label> Minimum Qty </label>
                                        <input name='minimum_qty' onChange={handleInputChange} type='number' required  />
                                    </div>

                                    <div className='input'>
                                        <label> quantity </label>
                                        <input name='quantity' onChange={handleInputChange} type='number' required  />
                                    </div>

                                </div>




                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Description </label>
                                        <textarea name='description'  onChange={(e) => {
                                                setDescription(e.target.value);
                                                handleInputChange(e);
                                            }} type='text' required></textarea>
                                    </div>
                                </div>


                                <div className='inputs'>
                                    

                                    <div className='input'>
                                        <label> Tax </label>
                                        
                                        <input name='tax' placeholder="You don't have to add %" onChange={handleInputChange} type='number' required  />

                                    </div>

                                    <div className='input'>
                                        <label> Discount Type </label>
                                        
                                        <input name='discount_type' placeholder="You don't have to add %" onChange={handleInputChange} type='number' required  />

                                    </div>

                                    <div className='input'>
                                        <label> Price </label>
                                        <input name='price' onChange={handleInputChange} type='text' required  />
                                    </div>

                                    <div className='input'>
                                        <label> Status </label>

                                        <select name='status' onChange={handleInputChange} required >

                                            <option value="">Choose Status</option>


                                            <option  value="available">available</option>

                                            <option value="Out of stock">Out of stock</option>

                                        </select>
                                    </div>

                                </div>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Prodcut Image </label>
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

            
            {showPopup && (
                <div className={`popup ${showPopup ? 'show' : ''}`}>
                    {popupMessage}
                </div>
            )}
        </>
    )
}

export default AddProduct;