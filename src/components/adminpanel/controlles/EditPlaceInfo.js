import '../css/products.css';
import '../css/additems.css';
import React, { useState, useEffect } from 'react';
import axios from '../../../config/index';

function EditPlaceInfo() {


    const [userId, setUserId] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        label: '',
        facebook_link: '',
        location_link: '',
        twitter_link: '',
        instagram_link: '',
        tiktok_link: '',
        youtube_link: '',
        rate_link: '',
        color1: '',
        color2: '',
        logo: null,
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
            getItemDetails(userId);
        }
    }, [userId]);

    const getItemDetails = (itemId) => {
        axios.post('get-item', { itemId, table: "place_info" })
            .then((res) => {
                if (res.data) {
                    setFormData({
                        name: res.data.name,
                        label: res.data.label,
                        facebook_link: res.data.facebook_link,
                        location_link: res.data.location_link,
                        twitter_link: res.data.twitter_link,
                        instagram_link: res.data.instagram_link,
                        tiktok_link: res.data.tiktok_link,
                        youtube_link: res.data.youtube_link,
                        rate_link: res.data.rate_link,
                        color1: res.data.color1,
                        color2: res.data.color2,
                        logo: null,
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
            logo: file,
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('label', formData.password);
        formDataToSubmit.append('facebook_link', formData.facebook_link);
        formDataToSubmit.append('location_link', formData.location_link);
        formDataToSubmit.append('twitter_link', formData.twitter_link);
        formDataToSubmit.append('instagram_link', formData.instagram_link);
        formDataToSubmit.append('tiktok_link', formData.tiktok_link);
        formDataToSubmit.append('youtube_link', formData.youtube_link);
        formDataToSubmit.append('rate_link', formData.rate_link);
        formDataToSubmit.append('color1', formData.color1);
        formDataToSubmit.append('color2', formData.color2);
        if (formData.logo) {
            formDataToSubmit.append('logo', formData.logo); // Correct field name
        }

        try {
            const response = await axios.post(`/update-place-info`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPopupMessage(' تم التحديث بنجاح ');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            setPopupMessage('حدث خطأ اثناء التحديث');
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
                        <h1>  إعدادات المكان </h1>
                    </div>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className='dash-inputs-items'>
                        <form onSubmit={handleSubmit}>
                            <div className='inputs'>


                                <div className='input'>
                                    <label>  الاسم  </label>
                                    <input name='name' value={formData.name} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>  اسم الفرع  </label>
                                    <input name='label' value={formData.label} onChange={handleInputChange} type='text' />
                                </div>
                                
                            </div>



                            <div className='inputs'>
                                <div className='input'>
                                    <label>  رابط الفيسبوك  </label>
                                    <input name='facebook_link' value={formData.facebook_link} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>  رابط الموقع من جوجل مابس  </label>
                                    <input name='location_link' value={formData.location_link} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>  رابط تويتر  </label>
                                    <input name='twitter_link' value={formData.twitter_link} onChange={handleInputChange} type='text' />
                                </div>

                                <div className='input'>
                                    <label>  رابط انستجرام  </label>
                                    <input name='instagram_link' value={formData.instagram_link} onChange={handleInputChange} type='text' />
                                </div>

                            </div>



                            
                            <div className='inputs'>
                                <div className='input'>
                                    <label>  رابط تيكتوك  </label>
                                    <input name='tiktok_link' value={formData.tiktok_link} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>  رابط يوتيوب  </label>
                                    <input name='youtube_link' value={formData.youtube_link} onChange={handleInputChange} type='text' />
                                </div>
                                <div className='input'>
                                    <label>  رابط اضافة التقييم على جوجل  </label>
                                    <input name='rate_link' value={formData.rate_link} onChange={handleInputChange} type='text' />
                                </div>
                            </div>

                            
                            <div className='inputs'>
                                <div className='input'>
                                    <label>  اللون الاول للموقع  </label>
                                    <input name='color1' value={formData.color1} onChange={handleInputChange} type='color' />
                                </div>
                                <div className='input'>
                                    <label>  اللون الثاني للموقع  </label>
                                    <input name='color2' value={formData.color2} onChange={handleInputChange} type='color' />
                                </div>
                                
                                
                            </div>




                            <div className='inputs'>
                                <div className='input'>
                                    <label> اللوجو الخاص بك </label>
                                    <div className='drag-drop-area' onDragOver={handleDragOver} onDrop={handleDrop}>
                                        {formData.logo ? (
                                            <img
                                                src={URL.createObjectURL(formData.logo)}
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
                                    <input type="file" onChange={(event) => setFormData({ ...formData, logo: event.target.files[0] })} />
                                </div>
                            </div>
                            <div className='btns'>
                                <button className='submit' type='submit'> حفظ </button>
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

export default EditPlaceInfo;
