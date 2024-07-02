import './css/downnav.css';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function DownNav() {
    const { pathname } = useLocation();
    const [numBookmarkedProducts, setNumBookmarkedProducts] = useState(0);
    const [bookmarkedProducts, setBookmarkedProducts] = useState(
        JSON.parse(localStorage.getItem('bookmarkedProducts')) || []
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleBookmarkClick = () => {
            setTimeout(() => {
                setBookmarkedProducts(JSON.parse(localStorage.getItem('bookmarkedProducts')) || []);
            }, 300); // Timeout set to 1 second (1000 milliseconds)
        };

        document.querySelectorAll('.add-to-bookmark').forEach(element => {
            element.addEventListener('click', handleBookmarkClick);
        });

        return () => {
            document.querySelectorAll('.add-to-bookmark').forEach(element => {
                element.removeEventListener('click', handleBookmarkClick);
            });
        };
    }, []);

    useEffect(() => {
        let totalQuantity = 0;
        bookmarkedProducts.forEach(product => {
            totalQuantity += product.quantity || 0; // Ensure to handle cases where quantity may be undefined
        });
        setNumBookmarkedProducts(totalQuantity);
    }, [bookmarkedProducts]);

    const currentPath = pathname;

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
