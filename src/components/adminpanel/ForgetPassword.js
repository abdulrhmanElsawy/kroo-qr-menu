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



function ForgetPassword(){



    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/reset-password', { email });
            if (response.data && response.status === 200) {
                // Handle success
                setMessage({ type: 'success', content: 'A link to reset your password has been sent to your email.' });
                // Optionally navigate the user to the login page or display the message
                // navigate('/login');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 404) {
                setMessage({ type: 'error', content: 'Email does not exist.' });
            } else {
                setMessage({ type: 'error', content: 'An error occurred. Please try again later.' });
            }
        }
    };



    return(
        <>
            <section className='login-container'>


                <div className='login-form'>
                    <img src={Logo} alt="logicstck pro logo" />
                    <h2> Forget Password ? Write your email </h2>

                    {message.content && (
                        <div className={`msg ${message.type}-msg`}>
                            {message.content}
                        </div>
                    )}

                        <form onSubmit={handleSubmit}>

                        <div className='input'>
                            <label> Email </label>
                            <input
                                name='email'
                                type='email'
                                required
                                placeholder='Enter your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i class="las la-envelope"></i>
                        </div>


                        <button type='submit' aria-label='confirm email'> Send Verfication Code </button>
                    </form>

                    <h4>
                        Already have an account? <RouterLink to="/kroo-qr-menu/"> Sign In </RouterLink>
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

export default ForgetPassword;