import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';

import axios from '../../../config/index'; // Adjust the import path as needed

function AddExpenseCategory(){

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description:''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };
    

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        


        try {
            const response = await axios.post('/add-new-expense-category', formDataToSubmit, {
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
                name: '',
                description:''
            });

        } catch (error) {
            console.error('Error submitting the form:', error);

            
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
                            <h1>  Add  Expense Category </h1>
                            <h2> Create new Expense Category </h2>
                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Category Name </label>
                                        <input name='name' onChange={handleInputChange} type='text' required  />
                                    </div>

                        

                                </div>




                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Category Description </label>
                                        <textarea name='description' onChange={handleInputChange} required>

                                        </textarea>
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

export default AddExpenseCategory;