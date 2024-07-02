import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditExpenseCategory() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('id');

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (categoryId) {
            getCategoryDetails(categoryId);
        }
    }, [categoryId]);

    const getCategoryDetails = (id) => {
        axios.post('get-item', { itemId: id, table: 'expenses_categories' })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        name: res.data.name,
                        description: res.data.description
                    });
                } else {
                    console.log("Error fetching category details");
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('id', categoryId);
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);

        try {
            const response = await axios.post('/update-expense-category', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setPopupMessage('Data updated successfully!');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            
        } catch (error) {
            console.error('Error submitting the form:', error);
            setPopupMessage('Error submitting the form');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    return (
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>
                    <div className='page-header'>
                        <div className='text'>
                            <h1>Edit Expense Category</h1>
                            <h2>Edit existing Expense Category</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Category Name</label>
                                        <input name='name' value={formData.name} onChange={handleInputChange} type='text' required />
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Category Description</label>
                                        <textarea name='description' value={formData.description} onChange={handleInputChange} required></textarea>
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
            {showPopup && (
                <div className={`popup ${showPopup ? 'show' : ''}`}>
                    {popupMessage}
                </div>
            )}
        </>
    )
}

export default EditExpenseCategory;
