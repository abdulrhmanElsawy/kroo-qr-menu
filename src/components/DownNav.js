import './css/downnav.css';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function DownNav() {
    const { pathname } = useLocation();
    const [numBookmarkedProducts, setNumBookmarkedProducts] = useState(0);
    const [stateChange, setStateChange] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleBookmarkClick = () => {
            navigate(pathname);
        };

        $('.add-to-bookmark').click(handleBookmarkClick);

        return () => {
            $('.add-to-bookmark').off('click', handleBookmarkClick);
        };
    }, [pathname, navigate]);

    useEffect(() => {
        const bookmarkedProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
        
        // Calculate total quantity of all products
        let totalQuantity = 0;
        bookmarkedProducts.forEach(product => {
            totalQuantity += product.quantity || 0; // Ensure to handle cases where quantity may be undefined
        });

        // Set the total quantity as numBookmarkedProducts
        setNumBookmarkedProducts(totalQuantity);
    }, []);

    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        return currentPath === path ? 'active' : '';
    };

    return (
        <>
            <section className='down-nav'>
                <div className='container'>
                    <div className='nav-content'>
                        <ul>
                            <li>
                                <RouterLink className={isActive('/kroo-qr-menu/')} to="/kroo-qr-menu/">
                                    <i className="las la-home"></i>
                                    Home
                                </RouterLink>
                            </li>
                            <li>
                                <a href="https://maps.app.goo.gl/EeThXNVSJbokqtUV7" target="_blank">
                                    <i className="las la-star"></i>
                                    Rate Us
                                </a>
                            </li>
                            <li>
                                <a href="https://maps.app.goo.gl/EeThXNVSJbokqtUV7" target="_blank">
                                    <i className="las la-map-marked"></i>
                                    Location
                                </a>
                            </li>
                            <li>
                                <span className='num-products'>{numBookmarkedProducts}</span>
                                <RouterLink className={isActive('/kroo-qr-menu/bookmark')} to="/kroo-qr-menu/bookmark">
                                    <i className="las la-bookmark"></i>
                                    Your Orders
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DownNav;
