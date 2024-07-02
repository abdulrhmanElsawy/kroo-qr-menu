import '../css/products.css';
import '../css/additems.css';

import React, { useState, useEffect } from 'react';
import axios from '../../../config/index'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';

function EditUnit() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const unitId = queryParams.get('id');

    const [formData, setFormData] = useState({
        UnitName: '',
        description: '',
    });

    useEffect(() => {
        getUnitDetails(unitId);
    }, [unitId]);

    const getUnitDetails = (id) => {
        axios.post('get-item', { itemId: id, table: 'units' })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        UnitName: res.data.name, // Correctly map the API response to the state
                        description: res.data.description,
                    });
                } else {
                    console.log("Error fetching unit details");
                }
            })
            .catch((err) => console.log(err));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('id', unitId);
        formDataToSubmit.append('name', formData.UnitName);
        formDataToSubmit.append('description', formData.description);

        try {
            const response = await axios.post('/update-unit', formDataToSubmit, {
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
                            <h1>Edit Unit</h1>
                            <h2>Edit existing Unit</h2>
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='dash-inputs-items'>
                            <form onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Unit Name</label>
                                        <input name='UnitName' value={formData.UnitName} onChange={handleInputChange} type='text' required />
                                    </div>
                                </div>
                                <div className='inputs'>
                                    <div className='input'>
                                        <label>Description</label>
                                        <textarea name='description' value={formData.description} onChange={handleInputChange} type='text' required></textarea>
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
        </>
    )
}

export default EditUnit;
