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



    const [subCategories, setAllSubCategories] = useState([]);

    const getAllSubCategories = () => {
        axios.post("AllItems", {
            table: "sub_categories",
        })
        .then((res) => {
            if (res.data) {
                setAllSubCategories(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };



    

    const [brands, setAllBrands] = useState([]);

    const getAllBrands = () => {
        axios.post("AllItems", {
            table: "brands",
        })
        .then((res) => {
            if (res.data) {
                setAllBrands(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };



    const [units, setAllUnits] = useState([]);

    const getAllUnits = () => {
        axios.post("AllItems", {
            table: "units",
        })
        .then((res) => {
            if (res.data) {
                setAllUnits(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };





    useEffect(() => {
        getAllCategories();
        getAllSubCategories();
        getAllBrands();
        getAllUnits();

    }, []);



    
    const [selectedCategory, setSelectedCategory] = useState('');

    const [filterdSubCategories, SetFilterdSubCategories] = useState([]);


    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        sub_category:'',
        brand:'',
        unit: '',
        sku: '',
        minimum_qty: '',
        quantity: '',
        description: '',
        tax: '',
        discount_type:'',
        price:'',
        status: '',
        uploadedImage: null, 
    });

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
            const response = await axios.post('/add-new-product', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Show success popup
            setPopupMessage('Data added successfully!');
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
                productName: '',
                category: '',
                sub_category:'',
                brand:'',
                unit: '',
                sku: '',
                minimum_qty: '',
                quantity: '',
                description: '',
                tax: '',
                discount_type:'',
                price:'',
                status: '',
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


    const [description, setDescription] = useState('');
    const [predictedCategory, setPredictedCategory] = useState(0);


    const getPredictedCategory = (userId, description) => {
        const requestData = {
            user_id: userId,
            description: description
        };

        // Send a request to your Flask API
        axios2.post('http://127.0.0.1:5000/predict_category', requestData)
        .then(response => {
            setPredictedCategory(response.data.category_id);
            setSelectedCategory(response.data.category_id)
            const filteredSubCategories = subCategories.filter(subCategory => subCategory.cat_id === parseInt(response.data.category_id));
            SetFilterdSubCategories(filteredSubCategories);
        })
        .catch(error => {
            // Handle error
            console.error('Error predicting category:', error);
            alert('Error predicting category. Please try again later.');
        });
    };

    const handleAiButtonClick = () => {
        if (description.trim() && userId > 0) {
            getPredictedCategory(userId, description);
        } else {
            alert('Please enter a description and ensure user ID is valid.');
        }
    };

    useEffect(() => {
        if (userId > 0 && description.trim()) {
            getPredictedCategory(userId, description);
        }
    }, [userId, description]);

    

return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1> Products Add  </h1>
                            <h2> Create new product </h2>
                            <button onClick={handleAiButtonClick}>  Predict Category Using Description <span> (ai powered <i class="las la-star"></i>)</span></button>

                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Product Name </label>
                                        <input name='productName' onChange={handleInputChange} type='text' required  />
                                    </div>

                                    <div className='input'>
                                        <label> Category </label>
                                        {predictedCategory > 0 && predictedCategory != "" && predictedCategory != null ? (
                                            <select 
                                                value={predictedCategory} 
                                                name='category' 
                                                onChange={(e) => { handleInputChange(e); handleSelectInputChange(e); }} 
                                                required
                                            >
                                                <option value="">Choose Category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select 
                                                
                                                name='category' 
                                                onChange={(e) => { handleInputChange(e); handleSelectInputChange(e); }} 
                                                required
                                            >
                                                <option value="">Choose Category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    <div className='input'>
                                        <label> Sub Category </label>
                                        <select name='sub_category' onChange={handleInputChange} required disabled={!selectedCategory}>
                                            <option value="">Choose Sub Category</option>
                                            
                                            {filterdSubCategories.length > 0 ? (
                                                filterdSubCategories.map((subCategory, index) => (
                                                    <option key={index} value={subCategory.id}>{subCategory.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No subcategories available</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className='input'>
                                        <label> Brand </label>
                                        <select name='brand' onChange={handleInputChange} required >
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
                                        <label> Unit </label>
                                        <select name='unit' onChange={handleInputChange} required >
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