import './css/sidenav.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from './images/logo.png';
import React, { useState, useEffect } from "react";
import $ from "jquery"; // Import jQuery if not already imported
import axios from '../../config/index'; // Adjust the import path as needed

function SideNav() {
    const [users, setAllUsers] = useState([]);
    const navigate = useNavigate();

    const getAllUsers = () => {
        axios.post("AllUsers", {
            table: "users",
        })
        .then((res) => {
            if (res.data && Array.isArray(res.data)) {
                setAllUsers(res.data);
                if (res.data[0] && res.data[0].type === 'admin') {
                    navigate('/all-users');
                }
            } else {
                console.log("Error happened or no data received");
                setAllUsers([]);
            }
        })
        .catch((err) => {
            console.log(err);
            setAllUsers([]);
        });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const [arrowDirection, setArrowDirection] = useState("right");

    const changeArrowDir = () => {
        setArrowDirection((prevDirection) => (prevDirection === "right" ? "left" : "right"));
    };

    const handleToggleSideNav = () => {
        $(".side-nav-content").toggleClass("active");
        $(".dashboard-container").toggleClass("active");
        $(".nav-content").toggleClass("active");
        changeArrowDir();
    };

    const handleNavItemClick = (event) => {
        const targetLi = $(event.currentTarget);
        targetLi.children(".sub-nav-eles").toggleClass("active");
    };

    const location = useLocation();

    useEffect(() => {
        if ($(".dashboard-container").hasClass("active")) {
            $(".side-nav-content").addClass("active");
            $(".nav-content").addClass("active");
            setArrowDirection("right");
        }
    }, [location.pathname]);

    useEffect(() => {
        $('.toggle-side-nav').on('click', handleToggleSideNav);
        $('.nav-eles>ul>li').on('click', handleNavItemClick);

        return () => {
            $('.toggle-side-nav').off('click', handleToggleSideNav);
            $('.nav-eles>ul>li').off('click', handleNavItemClick);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get('/logout');
            if (response.data.logout) {
                navigate('/admin');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <div className='side-nav'>
                <div className='side-nav-content active'>
                    <div className='header'>
                        {users[0] && users[0].type !== 'admin' && (
                            <RouterLink to='/dashboard'>
                                <img src={Logo} aria-label='logo' />
                            </RouterLink>
                        )}

                        {users[0] && users[0].type === 'admin' && (
                            <RouterLink to='/all-users'>
                                <img src={Logo} aria-label='logo' />
                            </RouterLink>
                        )}

                        <button className='toggle-side-nav'>
                            <i className={`las la-angle-double-${arrowDirection}`}></i>
                        </button>
                    </div>

                    <div className='side-nav-eles-container'>
                        {users[0] && users[0].type !== 'admin' && (
                            <>
                    
                            <div className='side-nav-eles'>
                                <h2> Products </h2>
                                <div className='nav-eles'>
                                    <ul>
                                        <li>
                                            <RouterLink to='/products'>
                                                <i class="las la-box"></i>
                                                Products
                                            </RouterLink>
                                        </li>
        
                                        <li>
                                            <RouterLink to='/add-product'>
                                                <i class="las la-calendar-plus"></i>
                                                Create New Product
                                            </RouterLink>
                                        </li>
        
                                        <li>
                                            <RouterLink to='/categories'>
                                                <i class="las la-inbox"></i>
                                                Category
                                            </RouterLink>
                                        </li>
        
                                        <li>
                                            <RouterLink to='/brands'>
                                                <i class="las la-tag"></i>
                                                Brands
                                            </RouterLink>
                                        </li>
        
                                        <li>
                                            <RouterLink to='/units'>
                                                <i class="las la-tag"></i>
                                                Units
                                            </RouterLink>
                                        </li>
        
        
        
                                        <li>
                                            <RouterLink to='/sub-categories'>
                                                <i class="las la-th-large"></i>
                                                Sub Category
                                            </RouterLink>
                                        </li>
        
                                        <li>
                                            <RouterLink to='/import-products'>
                                                <i class="las la-upload"></i>
                                                Import Products
                                            </RouterLink>
                                        </li>
        
                                    </ul>
                                </div>
                            </div>
        
        
    
        
                        
        
            
                            <div className='side-nav-eles'>
                                <h2> Settings </h2>
                                <div className='nav-eles'>
                                    <ul>
                                        <li>
                                            <RouterLink to='/user-settings'>
                                                <i class="las la-cog"></i>
                                                Settings
                                            </RouterLink>
        
                                            <ul className='sub-nav-eles'>
                                                <li>
                                                    <RouterLink to="/user-settings">
                                                        <i class="las la-ellipsis-h"></i>
                                                        General Settings
                                                    </RouterLink>
                                                </li>
        
                                            
        
        
                                            </ul>
        
                                            
        
        
        
                                        </li>
        
        
        
                                        <li  >
                                            <a onClick={handleLogout}>
                                                <i class="las la-sign-out-alt"></i>
                                                Logout
                                            </a>
        
                                        </li>
        
                                    </ul>
                                </div>
                            </div>
                            </>
                        )}

                        {users[0] && users[0].type === 'admin' && (
                            <>
                                <div className='side-nav-eles'>
                                    <h2> Users </h2>
                                    <div className='nav-eles'>
                                        <ul>
                                            <li>
                                                <RouterLink to='/all-users'>
                                                    <i className="las la-users"></i>
                                                    All Users
                                                </RouterLink>
                                            </li>

                                            
                                        <li  >
                                            <a onClick={handleLogout}>
                                                <i class="las la-sign-out-alt"></i>
                                                Logout
                                            </a>
        
                                        </li>
                                        </ul>
                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </div>

                <div className='nav-content active'>
                    <button className='toggle-side-nav'>
                        <i className={`las la-angle-double-${arrowDirection}`}></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideNav;
