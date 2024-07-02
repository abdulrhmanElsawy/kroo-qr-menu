import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from '../../config/index'; // Adjust the import path as needed

import { useLocation } from 'react-router-dom';

import Logo from './images/logo.png';
import GoogleIcon from './images/icons/google.png';
import FacebookIcon from './images/icons/facebook.png';
import LoginIlli from './images/loginilli.webp';
import Lines from './images/lines.webp';
import './css/login.css';

import { useEffect } from 'react';


function Login() {


    
    const location = useLocation();

    useEffect(() => {
        const fetchSessionData = async () => {


            try {
                const response = await axios.get('/session');

                if (response.data && response.data.valid) {
                    navigate('/dashboard');
                    console.log(response.data);
                    console.log(response.data.valid);

                } else {
                    console.log(response.data);
                    console.log(response.data.valid);
                    // If the session data is not valid, navigate the user to "/"
                    navigate('/');
                }
            } catch (error) {
                console.log(error)
                navigate('/'); // Navigate on error as well
            }
        };

        fetchSessionData();
    }, [location.pathname]); 


    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(5); // Assuming 5 attempts by default
    const [passwordVisible, setPasswordVisible] = useState(false);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            setMessage(response.data.message);
            // Navigate to dashboard or home page upon successful login
            console.log(response.message)
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                console.log("active1")
                // Handle the case where attempts left are returned from the server
                if (error.response.attemptsLeft) {
                    console.log("active2")

                    setAttemptsLeft(error.response.attemptsLeft);
                }
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <>
            <section className='login-container'>
                <div className='login-form'>
                    <img src={Logo} alt="logicstock pro logo" />
                    <h2>Sign In</h2>
                    <h3>Please login to your account</h3>

                    {message && <div className='err-msg'>{message}</div>}
                    {attemptsLeft < 5 && (
                        <div className='warning-msg'>
                            Warning: You have {attemptsLeft} attempts left before your account is locked.
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>
                        <div className='input'>
                            <label>Email</label>
                            <input
                                name='email'
                                type='email'
                                required
                                placeholder='Enter your email address'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <i className="las la-envelope"></i>
                        </div>

                        <div className='input'>
                            <label>Password</label>
                            <input
                                name='password'
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button 
                                type="button" 
                                className='show-pass' 
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                aria-label="Toggle password visibility"
                            >
                                <i className={passwordVisible ? "las la-eye" : "las la-eye-slash"}></i>
                            </button>
                            
                            </div>

                        <RouterLink to='/forget-password'>Forgot Password?</RouterLink>

                        <button type='submit' aria-label='login btn'>Sign In</button>
                    </form>

                    <h4>Don't have an account? <RouterLink to="/kroo-qr-menu/sign-up">Sign Up</RouterLink></h4>

                    <div className='separat'>
                        <span></span>
                        <h5>Or sign in with</h5>
                    </div>

                    <div className='other-signin-options'>
                        <a href="#">
                            <img src={GoogleIcon} alt='google icon' />Sign In using Google
                        </a>

                        <a href="#">
                            <img src={FacebookIcon} alt='google icon' />Sign In using Facebook
                        </a>
                    </div>
                </div>

                <div className='login-img'>
                    <img src={LoginIlli} alt="login-image" />
                    <img src={Lines} alt="lines" />
                </div>
            </section>
        </>
    );
}

export default Login;