import './css/login.css';
import './css/signup.css';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Logo from './images/logo.png';

import GoogleIcon from './images/icons/google.png';
import FacebookIcon from './images/icons/facebook.png';
import LoginIlli from './images/loginilli.webp';
import Lines from './images/lines.webp';


import React, { useState,useEffect } from 'react';
import axios from '../../config/index';



function ConfirmEmail(){


    const [confirmationCode, setConfirmationCode] = useState('');
    const [ERRmessage, setERRMessage] = useState('');
    const [SUCmessage, setSUCMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/check_confirmation_code', {
                confirmationCode
            });

            if (response.data && response.status === 200) {
                setSUCMessage('Email successfully confirmed. You can now log in.');
                setERRMessage('');
                setTimeout(() => {
                    navigate('/'); // Redirecting to the login page after successful confirmation
                }, 3000); // Redirect after 3 seconds
            }
        } catch (error) {
            console.error('Error confirming email:', error);
            setSUCMessage('');
            if (error.response && error.response.data) {
                setERRMessage(error.response.data.message);
            } else {
                setERRMessage('An unexpected error occurred. Please try again.');
            }
        }
    };


    return(
        <>
            <section className='login-container'>


                <div className='login-form'>
                    <img src={Logo} alt="logicstck pro logo" />
                    <h2> Check your mail box for confirmation code </h2>

                    {ERRmessage && (
                        <div className='err-msg'>
                            {ERRmessage}
                        </div>
                    )}

                    
                    {SUCmessage && (
                        <div className='suc-msg'>
                            {SUCmessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className='input'>
                            <label> Confirmation Code </label>
                            <input name='confirm_code' type='text' required placeholder='Enter your code' value={confirmationCode} onChange={handleChange} />
                            <i class="las la-envelope"></i>
                        </div>


                        <button type='submit' aria-label='confirm email'> Confirm <i className="las la-lock"></i></button>
                    </form>

                    <h4>
                        Already have an account? <RouterLink to="/"> Sign In </RouterLink>
                    </h4>
                </div>



                <div className='login-img'>
                    <img src={LoginIlli} alt="login-image" />
                    <img src={Lines} alt="lines" />
                </div>



            </section>
        </>
    )
}

export default ConfirmEmail;