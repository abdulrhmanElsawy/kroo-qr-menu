import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditExpense() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const expenseId = queryParams.get('id');
    const [expensesCategories, setExpensesCategories] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const [formData, setFormData] = useState({
        cat_id: '',
        amount: ''
    });

    useEffect(() => {
        if (expenseId) {
            getExpenseDetails(expenseId);
        }
        getAllExpenesCategoires();
    }, [expenseId]);

    const getExpenseDetails = (id) => {
        axios.post('get-item', { itemId: id, table: 'expenses' })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        cat_id: res.data.cat_id,
                        amount: res.data.amount
                    });
                } else {
                    console.log("Error fetching expense details");
                }
            })
            .catch((err) => console.log(err));
    };

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
        formDataToSubmit.append('id', expenseId);
        formDataToSubmit.append('cat_id', formData.cat_id);
        formDataToSubmit.append('amount', formData.amount);

        try {
            const response = await axios.post('/update-expense', formDataToSubmit, {
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
                            <h1>Edit Expense</h1>
                            <h2>Edit existing Expense</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Expense Category</label>
                                        <select name='cat_id' value={formData.cat_id} onChange={handleInputChange} required>
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
                                        <label>Amount</label>
                                        <input name='amount' value={formData.amount} onChange={handleInputChange} type='number' required />
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
    );
}

export default EditExpense;
