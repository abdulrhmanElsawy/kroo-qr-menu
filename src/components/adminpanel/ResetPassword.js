import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../config/index';
import Logo from './images/logo.png';
import LoginIlli from './images/loginilli.webp';
import Lines from './images/lines.webp';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();
    const query = useQuery(); // Custom hook to parse query parameters

    const [passwordVisible, setPasswordVisible] = useState(false);



    // Extract token and email from URL parameters
    const token = query.get('token');
    const email = query.get('email');



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/update-password', {
                email,
                token,
                newPassword
            });
            if (response.data && response.status === 200) {
                // Handle success
                setMessage({ type: 'success', content: 'Your password has been updated successfully.' });
                // Optionally navigate the user to the login page or another appropriate page after a short delay
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            // Handle error
            setMessage({ type: 'error', content: 'An error occurred. Please try again later or check your input.' });
        }
    };

    useEffect(() => {
        // Redirect to home or show an error if token or email is missing
        if (!token || !email) {
            setMessage({ type: 'error', content: 'Invalid or missing token and email. Please check your link and try again.' });
            setTimeout(() => navigate('/'), 5000); // Redirect after showing the message
        }
    }, [token, email, navigate]);

    return (
        <>
            <section className='login-container'>
                <div className='login-form'>
                    <img src={Logo} alt="logicstck pro logo" />
                    <h2>Reset Your Password</h2>

                    {message.content && (
                        <div className={`msg ${message.type}-msg`}>
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='input'>
                            <label>New Password</label>
                            <input
                                name='newPassword'
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                placeholder='Enter your new password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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

                        <button type='submit' aria-label='reset password'>Reset Password</button>
                    </form>

                    <h4>
                        Remembered your password? <RouterLink to="/kroo-qr-menu/">Sign In</RouterLink>
                    </h4>
                </div>

                <div className='login-img'>
                    <img src={LoginIlli} alt="login-image" />
                    <img src={Lines} alt="lines" />
                </div>
            </section>
        </>
    );
}

export default ResetPassword;
