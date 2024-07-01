import './css/popproductsslider.css';

import ProductImg1 from './images/products/1.webp';
import ProductImg2 from './images/products/2.webp';
import ProductImg3 from './images/products/3.webp';
import ProductImg4 from './images/products/4.webp';
import ProductImg5 from './images/products/5.webp';
import ProductImg6 from './images/products/6.webp';
import ProductImg7 from './images/products/7.webp';
import ProductImg8 from './images/products/8.webp';
import ProductImg9 from './images/products/9.webp';
import ProductImg10 from './images/products/10.webp';
import ProductImg11 from './images/products/11.webp';
import ProductImg12 from './images/products/12.webp';
import ProductImg13 from './images/products/13.webp';
import ProductImg14 from './images/products/14.webp';
import ProductImg15 from './images/products/15.webp';
import ProductImg16 from './images/products/16.webp';
import ProductImg17 from './images/products/17.webp';
import ProductImg18 from './images/products/18.webp';
import ProductImg19 from './images/products/19.webp';
import ProductImg20 from './images/products/20.webp';
import ProductImg21 from './images/products/21.webp';
import ProductImg22 from './images/products/22.webp';
import ProductImg23 from './images/products/23.webp';
import ProductImg24 from './images/products/24.webp';
import ProductImg25 from './images/products/25.webp';
import ProductImg26 from './images/products/26.webp';
import ProductImg27 from './images/products/27.webp';
import ProductImg28 from './images/products/28.webp';
import ProductImg29 from './images/products/29.webp';
import ProductImg30 from './images/products/30.webp';


import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';

function PopProductsSlider() {
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [animateProduct, setAnimateProduct] = useState(null);

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
        const validBookmarks = savedBookmarks.filter(product => product.id && product.name && product.price);
        setBookmarkedProducts(validBookmarks);
    }, []);
    const handleBookmark = (product) => {
        if (!product.id || !product.name || product.name == "" || product.name == null || !product.price || !product.img) {
            console.error('Invalid product:', product);
            return;
        }
    
        // Filter out any invalid products from localStorage
        let savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
        savedBookmarks = savedBookmarks.filter(item => item.img);


    
        // Add the new valid product
        let updatedBookmarks = [...savedBookmarks];
        let existingProduct = updatedBookmarks.find(item => item.id === product.id);
    
        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            updatedBookmarks.push({ ...product, quantity: 1 });
        }
    
        setBookmarkedProducts(updatedBookmarks);
        localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedBookmarks));
    
        // Trigger animation
        setAnimateProduct(product.id);
        setTimeout(() => {
            setAnimateProduct(null);
        }, 1000); // Animation duration
    
    };
    

    const products = [
        { id: 1, name: ' espresso', price: 30, img: ProductImg1, rating: 5, reviews: 1, categoryId: 1 },
        { id: 2, name: ' americano', price: 50, img: ProductImg2, rating: 5, reviews: 1, categoryId: 1 },
        { id: 3, name: ' machiato', price: 45, img: ProductImg3, rating: 5, reviews: 1, categoryId: 1 },
        { id: 7, name: 'cappuccino', price: 60, img: ProductImg7, rating: 5, reviews: 1, categoryId: 1 },
        { id: 8, name: ' latte', price: 60, img: ProductImg8, rating: 5, reviews: 1, categoryId: 1 },
        { id: 9, name: ' flat white', price: 65, img: ProductImg9, rating: 5, reviews: 1, categoryId: 1 },
        { id: 10, name: 'mocha ', price: 50, img: ProductImg10, rating: 5, reviews: 1, categoryId: 1 },
        { id: 11, name: ' tea', price: 20, img: ProductImg11, rating: 5, reviews: 1, categoryId: 1 },
        { id: 12, name: ' nescafe', price: 30, img: ProductImg12, rating: 5, reviews: 1, categoryId: 1 },
        { id: 14, name: 'spanish latte ', price: 65, img: ProductImg14, rating: 5, reviews: 1, categoryId: 1 },
        { id: 15, name: ' hot chocolate', price: 60, img: ProductImg15, rating: 5, reviews: 1, categoryId: 1 },
    
        { id: 16, name: ' ice mocha', price: 70, img: ProductImg16, rating: 5, reviews: 1, categoryId: 2 },
        { id: 17, name: ' ice latte', price: 65, img: ProductImg17, rating: 5, reviews: 1, categoryId: 2 },
        { id: 18, name: ' frappuccino', price: 65, img: ProductImg18, rating: 5, reviews: 1, categoryId: 2 },
        { id: 19, name: ' latte frappe', price: 65, img: ProductImg19, rating: 5, reviews: 1, categoryId: 2 },
        { id: 20, name: ' mocha frappe', price: 65, img: ProductImg20, rating: 5, reviews: 1, categoryId: 2 },
        { id: 21, name: ' smoothie', price: 60, img: ProductImg21, rating: 5, reviews: 1, categoryId: 2 },

        
    ];
    
    return (
        <section className='pop-products'>
            <div className='container'>
                <div className='section-header'>
                    <RouterLink to="/popular-products">
                        <i className="las la-angle-left"></i> Show All 
                    </RouterLink>
                    <h1>  Popular Products </h1>
                </div>
                <div className='pop-products-slider'>
                    <Swiper
                        grabCursor={true}
                        spaceBetween={50}
                        slidesPerView={'auto'}
                        navigation={{
                            nextEl: '.next-btn',
                            prevEl: '.prev-btn',
                        }}
                        pagination={false}
                        modules={[Autoplay, Navigation, Pagination]}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div className='product'>
                                <RouterLink to={`product?id=${product.id}`}>
                                <img src={product.img} alt='product img' 
                                        className={animateProduct === product.id ? 'animate-to-bookmark' : ''}

                                        />
                                    </RouterLink>
                                    <div className='text'>
                                    <RouterLink to={`product?id=${product.id}`}>
                                    <h2>{product.name}</h2>
                                        </RouterLink>
                                        <div className='rate'>
                                            <h3><i className="las la-star"></i> {product.rating} <span> ({product.reviews}) </span></h3>
                                        </div>
                                        <div className='options'>
                                            <h4 className='price'><span> l.e </span> <h6> {product.price} </h6></h4>
                                            <button className='add-product-to-bookmark' onClick={() => handleBookmark(product)}><i className="las la-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default PopProductsSlider;
