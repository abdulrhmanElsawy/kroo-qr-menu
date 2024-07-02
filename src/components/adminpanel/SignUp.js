import './css/login.css';
import './css/signup.css';

import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Logo from './images/logo.png';

import GoogleIcon from './images/icons/google.png';
import FacebookIcon from './images/icons/facebook.png';
import LoginIlli from './images/loginilli.webp';
import Lines from './images/lines.webp';


import React, { useState,useEffect } from 'react';
import axios from '../../config/index';



function SignUp(){

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    // State to hold error or success messages
    const [ERRmessage, setERRMessage] = useState('');
    const [SUCmessage, setSUCMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Initially clear both messages to ensure only relevant message is shown
        setSUCMessage('');
        setERRMessage('');
    
        try {
            const response = await axios.post('/signup', {
                fullname: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
    
            if (response.status === 201) {
                setSUCMessage('Signup successful. Confirm Your Email.'); // Success message
                // Clear any previous error message
                setERRMessage('');
                navigate('/confirm-email'); // Redirect to the confirmation code input page
            } else {
                // If there's a specific error message from the server, display it
                setERRMessage(`Signup failed: ${response.data.message || 'Use Different Email'}`); 
                // Clear any previous success message
                setSUCMessage('');
            }
        } catch (error) {
            console.error('Signup error:', error);
            // Display a generic error message for any exception caught
            setERRMessage('Signup failed. Please try again.');
            // Clear any previous success message
            setSUCMessage('');
        }
    };

    
    return(
        <>
            <section className='login-container'>


                <div className='login-form'>
                    <img src={Logo} alt="logicstck pro logo" />
                    <h2> Create an Account </h2>

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
                            <label> Full Name </label>
                            <input name='fullName' type='text' required placeholder='Enter your full name' onChange={handleChange} />
                            <i class="las la-user"></i>
                        </div>

                        <div className='input'>
                            <label> Email </label>
                            <input name='email' type='email' required placeholder='Enter your email address' onChange={handleChange} />
                            <i class="las la-envelope"></i>
                        </div>

                        <div className='input'>
                            <label> Password </label>
                            <input name='password'   type={passwordVisible ? 'text' : 'password'} required placeholder='Enter your password' onChange={handleChange} />
                            <button 
                                type="button" 
                                className='show-pass' 
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                aria-label="Toggle password visibility"
                            >
                                <i className={passwordVisible ? "las la-eye" : "las la-eye-slash"}></i>
                            </button>
                            
                            </div>


                        <button type='submit' aria-label='signup btn'> Sign Up </button>
                    </form>

                    <h4>
                        Already have an account? <RouterLink to="/"> Sign In </RouterLink>
                    </h4>

                    <div className='separat'>
                        <span></span>
                        <h5> Or sign up with </h5>
                    </div>

                    <div className='other-signin-options'>
                        <a href="#">
                            <img src={GoogleIcon} alt='google icon' />
                            Sign In using Google
                        </a>

                        <a href="#">
                            <img src={FacebookIcon} alt='google icon' />
                            Sign In using Facebook
                        </a>
                    </div>
                </div>



                <div className='login-img'>
                    <img src={LoginIlli} alt="login-image" />
                    <img src={Lines} alt="lines" />
                </div>



            </section>
        </>
    )
}

export default SignUp;