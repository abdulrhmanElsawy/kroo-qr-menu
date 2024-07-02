import '../css/products.css';
import '../css/additems.css';
import React, { useState, useEffect } from 'react';
import axios from '../../../config/index';

function EditUser() {
    const [userId, setUserId] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [formData, setFormData] = useState({
        fullname: '',
        password: '',
        phone: '',
        currency: '',
        company_name: '',
        profile_img: null,
    });

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/session');
                if (response.data && response.data.valid) {
                    setUserId(response.data.userId);

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSessionData();
    }, []);

    useEffect(() => {
        if (userId !== 0) {
            getUserDetails(userId);
        }
    }, [userId]);

    const getUserDetails = (itemId) => {
        axios.post('get-user', { itemId, table: "users" })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        fullname: res.data.fullname,
                        password: res.data.password,
                        phone: res.data.phone,
                        currency: res.data.currency,
                        company_name: res.data.company_name,
                        profile_img: null,
                    });

                } else {
                    console.log("Error fetching user details");
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

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFormData({
            ...formData,
            profile_img: file,
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('user_id', userId);
        formDataToSubmit.append('fullname', formData.fullname);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('currency', formData.currency);
        formDataToSubmit.append('company_name', formData.company_name);
        if (formData.profile_img) {
            formDataToSubmit.append('profile_img', formData.profile_img); // Correct field name
        }

        try {
            const response = await axios.post(`/update-user`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPopupMessage('User updated successfully!');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            setPopupMessage('Error updating the User');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    return (
        <div className='dashboard-container active'>
            <div className='dashboard-content active'>
                <div className='page-header'>
                    <div className='text'>
                        <h1>User Settings</h1>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>
                            <div className='inputs'>
                                <div className='input'>
                                    <label>Full Name</label>
                                    <input name='fullname' value={formData.fullname} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>Password</label>
                                    <input name='password' onChange={handleInputChange} type='password' />
                                </div>
                                <div className='input'>
                                    <label>Phone Number</label>
                                    <input name='phone' value={formData.phone} onChange={handleInputChange} type='tel' />
                                </div>
                            </div>
                            <div className='inputs'>
                                <div className='input'>
                                    <label>Currency</label>
                                    <select name='currency' value={formData.currency} onChange={handleInputChange}>
                                        <option value="">Choose Currency</option>
                                        <option value="dollar">Dollar</option>
                                        <option value="EGP">EGP</option>
                                        <option value="SR">SR</option>
                                    </select>
                                </div>
                                <div className='input'>
                                    <label>Company Name</label>
                                    <input name='company_name' value={formData.company_name} onChange={handleInputChange} type='text' />
                                </div>
                            </div>
                            <div className='inputs'>
                                <div className='input'>
                                    <label>Upload Image</label>
                                    <div className='drag-drop-area' onDragOver={handleDragOver} onDrop={handleDrop}>
                                        {formData.profile_img ? (
                                            <img
                                                src={URL.createObjectURL(formData.profile_img)}
                                                alt="Uploaded"
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ) : (
                                            <img
                                                src={`./uploads/${formData.img}`}
                                                alt="Uploaded"
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        )}
                                    </div>
                                    <input type="file" onChange={(event) => setFormData({ ...formData, profile_img: event.target.files[0] })} />
                                </div>
                            </div>
                            <div className='btns'>
                                <button className='submit' type='submit'>Save</button>
                                <button className='cancel' type='button'>Cancel</button>
                            </div>
                        </form>
                        {showPopup && (
                            <div className='popup'>
                                <p>{popupMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
