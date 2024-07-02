import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';

import axios from '../../../config/index'; // Adjust the import path as needed

function AddExpense(){

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [formData, setFormData] = useState({
        cat_id: '',
        amount:''
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
        formDataToSubmit.append('cat_id', formData.cat_id);
        formDataToSubmit.append('amount', formData.amount);
        


        try {
            const response = await axios.post('/add-new-expense', formDataToSubmit, {
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
                cat_id: '',
                amount:''
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



    const [expensesCategories, setExpensesCategories] = useState([]);


    const getAllExpenesCategoires = () => {
        axios.post("AllItems", {
            table: "expenses_categories",
        })
        .then((res) => {
            if (res.data) {
                setExpensesCategories(res.data);

            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };


    
    useEffect(() => {
        getAllExpenesCategoires();

    }, []);



return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1>  Add  Expense </h1>
                            <h2> Create new Expense </h2>
                        </div>

                        
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>


                                <div className='inputs'>
                                    <div className='input'>
                                        <label> Expenes Category </label>
                                        <select name='cat_id' onChange={handleInputChange} required>
                                            <option value="">Choose Category</option>
                                            {expensesCategories.length > 0 ? (
                                                expensesCategories.map((cat, index) => (
                                                    <option key={index} value={cat.id}>{cat.name}</option>
                                                ))
                                            ) : (
                                                <option value="">No Categories available</option>
                                            )}
                                        </select>
                                    </div>


                                    <div className='input'>
                                        <label> Amount </label>
                                        <input name='amount' onChange={handleInputChange} type='number' required  />
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

export default AddExpense;