import './css/downnav.css';
import { Link as RouterLink } from 'react-router-dom';

import {  useLocation } from 'react-router-dom';

import { useEffect } from 'react';


function DownNav(){

    const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
    }, [pathname]);

            
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        return currentPath === path ? 'active' : '';
    };

    return(
        <>
            <section className='down-nav'>
                <div className='container'>
                    <div className='nav-content'>
                        <ul>
                            <li>
                                <RouterLink  className={isActive('/')} to="/kroo-qr-menu/">
                                    <i class="las la-home"></i>
                                    Home
                                </RouterLink>
                            </li>

                            <li>
                                <a href="https://maps.app.goo.gl/EeThXNVSJbokqtUV7" target="_blank" >
                                <i class="las la-star"></i>
                                    Rate Us
                                </a>
                            </li>

                            <li>
                                <a  href="https://maps.app.goo.gl/EeThXNVSJbokqtUV7" target="_blank">
                                    <i class="las la-map-marked"></i>
                                    Location
                                </a>
                            </li>

                            <li>
                                <RouterLink  className={isActive('bookmark')} to="/kroo-qr-menu/bookmark">
                                    <i class="las la-bookmark"></i>
                                    Your Orders
                                </RouterLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DownNav;