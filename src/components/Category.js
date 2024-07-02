import './css/category.css';

import CatImg1 from './images/cats/1.webp';
import CatImg2 from './images/cats/2.webp';
import CatImg3 from './images/cats/3.webp';
import CatImg4 from './images/cats/4.webp';
import CatImg5 from './images/cats/5.webp';
import CatImg6 from './images/cats/6.webp';
import CatImg7 from './images/cats/7.webp';
import CatImg8 from './images/cats/8.webp';


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

import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';


const categories = [
    { id: 1, name: 'Hot Drinks', img: CatImg1 },
    { id: 2, name: 'Iced Drinks', img: CatImg2 }
];


const products = [
    { id: 1, name: 'espresso', integ : 'No adds', price: 30, img: ProductImg1, rating: 5, reviews: 15, categoryId: 1,feature_ids: [3, 5] },
    { id: 2, name: 'americano', integ : 'No adds', price: 50, img: ProductImg2, rating: 5, reviews: 40, categoryId: 1, feature_ids: [1, 5] },
    { id: 3, name: 'machiato', integ : 'No adds', price: 45, img: ProductImg3, rating: 5, reviews: 12, categoryId: 1, feature_ids: [2, 5] },
    { id: 4, name: 'turkish coffee', integ : 'No adds', price: 40, img: ProductImg4, rating: 5, reviews: 125, categoryId: 1, feature_ids: [2, 5] },
    { id: 5, name: 'turkish hazelnut', integ : 'No adds', price: 50, img: ProductImg5, rating: 5, reviews: 17, categoryId: 1, feature_ids: [ 5] },
    { id: 6, name: 'french coffee', integ : 'No adds', price: 50, img: ProductImg6, rating: 5, reviews: 19, categoryId: 1, feature_ids: [ 5] },
    { id: 7, name: 'cappuccino', integ : 'No adds', price: 60, img: ProductImg7, rating: 5, reviews: 30, categoryId: 1, feature_ids: [1, 5] },
    { id: 8, name: 'latte', integ : 'No adds', price: 60, img: ProductImg8, rating: 5, reviews: 40, categoryId: 1, feature_ids: [1, 5] },
    { id: 9, name: 'flat white', integ : 'No adds', price: 65, img: ProductImg9, rating: 5, reviews: 20, categoryId: 1, feature_ids: [2, 5] },
    { id: 10, name: 'mocha', integ : 'No adds', price: 50, img: ProductImg10, rating: 5, reviews: 70, categoryId: 1, feature_ids: [2, 5] },
    { id: 11, name: 'tea', integ : 'No adds', price: 20, img: ProductImg11, rating: 5, reviews: 50, categoryId: 1, feature_ids: [4, 5] },
    { id: 12, name: 'nescafe', integ : 'No adds', price: 30, img: ProductImg12, rating: 5, reviews: 25, categoryId: 1, feature_ids: [ 5] },
    { id: 13, name: 'sahlab', integ : 'No adds', price: 50, img: ProductImg13, rating: 5, reviews: 27, categoryId: 1, feature_ids: [2, 5] },
    { id: 14, name: 'spanish latte', integ : 'No adds', price: 65, img: ProductImg14, rating: 5, reviews: 24, categoryId: 1, feature_ids: [ 5] },
    { id: 15, name: 'hot chocolate', integ : 'No adds', price: 60, img: ProductImg15, rating: 5, reviews: 17, categoryId: 1, feature_ids: [2, 5] },
    { id: 16, name: 'ice mocha', integ : 'No adds', price: 70, img: ProductImg16, rating: 5, reviews: 29, categoryId: 2, feature_ids: [2, 5] },
    { id: 17, name: 'ice latte', integ : 'No adds', price: 65, img: ProductImg17, rating: 5, reviews: 50, categoryId: 2, feature_ids: [ 5] },
    { id: 18, name: 'frappuccino', integ : 'No adds', price: 65, img: ProductImg18, rating: 5, reviews: 17, categoryId: 2, feature_ids: [ 5] },
    { id: 19, name: 'latte frappe', integ : 'No adds', price: 65, img: ProductImg19, rating: 5, reviews: 19, categoryId: 2, feature_ids: [ 5] },
    { id: 20, name: 'mocha frappe', integ : 'No adds', price: 65, img: ProductImg20, rating: 5, reviews: 20, categoryId: 2, feature_ids: [ 5] },
    { id: 21, name: 'smoothie', integ : 'No adds', price: 60, img: ProductImg21, rating: 5, reviews: 17, categoryId: 2, feature_ids: [ 5] },
    { id: 22, name: 'lemon mint', integ : 'No adds', price: 50, img: ProductImg22, rating: 5, reviews: 16, categoryId: 2, feature_ids: [ 5] },
    { id: 23, name: 'mohito', integ : 'No adds', price: 60, img: ProductImg23, rating: 5, reviews: 111, categoryId: 2, feature_ids: [ 5] },
    { id: 24, name: 'sunshine mint', integ : 'No adds', price: 65, img: ProductImg24, rating: 5, reviews: 17, categoryId: 2, feature_ids: [ 5] },
    { id: 25, name: 'soft drink', integ : 'No adds', price: 25, img: ProductImg25, rating: 5, reviews: 13, categoryId: 2, feature_ids: [ 5] },
    { id: 26, name: 'ice tea', integ : 'No adds', price: 55, img: ProductImg26, rating: 5, reviews: 20, categoryId: 2, feature_ids: [ 5] },
    { id: 27, name: 'water', integ : 'No adds', price: 15, img: ProductImg27, rating: 5, reviews: 82, categoryId: 2, feature_ids: [ ] },
    { id: 28, name: 'strawberry tango', integ : 'No adds', price: 70, img: ProductImg28, rating: 5, reviews: 70, categoryId: 2, feature_ids: [ 5] },
    { id: 29, name: 'redbull', integ : 'No adds', price: 55, img: ProductImg29, rating: 5, reviews: 40, categoryId: 2, feature_ids: [ ] },
    { id: 30, name: 'ice spanish latte', integ : 'No adds', price: 75, img: ProductImg30, rating: 5, reviews: 20, categoryId: 2, feature_ids: [ 5] },
];

function Category() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('id');

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredCat, setFilteredCategory] = useState([]);

    const [bookmarkedProducts, setBookmarkedProducts] = useState(() => {
        const saved = localStorage.getItem('bookmarkedProducts');
        const initialBookmarks = saved ? JSON.parse(saved) : [];
        console.log('Initial Bookmarked Products:', initialBookmarks);
        return initialBookmarks;
    });


    const [animateProduct, setAnimateProduct] = useState(null);

    useEffect(() => {
        const filtered = products.filter(product => product.categoryId === parseInt(categoryId));
        const filteredcat = categories.filter(cat => cat.id === parseInt(categoryId));

        setFilteredCategory(filteredcat);

        setFilteredProducts(filtered);
    }, [categoryId]);

    const handleBookmark = (product) => {
        const existingProduct = bookmarkedProducts.find(p => p.id === product.id); // Change to check by ID instead of name
        let updatedBookmarks;

        if (existingProduct) {
            updatedBookmarks = bookmarkedProducts.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            updatedBookmarks = [...bookmarkedProducts, { ...product, quantity: 1 }];
        }

        setBookmarkedProducts(updatedBookmarks);
        localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedBookmarks));

        // Trigger animation
        setAnimateProduct(product.id);
        setTimeout(() => {
            setAnimateProduct(null);
        }, 1000); // Animation duration
    };


    return (
        <>
            <section className='category'>
                <div className='container'>
                    <div className='row search-container-ele'>
                        <div className='section-header'>
                            <RouterLink to="category"></RouterLink>
                            <h1>{filteredCat.length? filteredCat[0].name: null}</h1>
                        </div>
                        {filteredProducts.map(product => (
                            <div key={product.id} className='col-lg-4 col-md-12 col-sm-12 col-12'>
                                <div className='cat-product'>
                                    <RouterLink to={`/kroo-qr-menu/product?id=${product.id}`}>
                                        <img 
                                            src={product.img} 
                                            alt='product img' 
                                            className={animateProduct === product.id ? 'animate-to-bookmark' : ''}
                                        />
                                    </RouterLink>
                                    <div className='text'>
                                    <RouterLink to={`/kroo-qr-menu/product?id=${product.id}`}>
                                            <h2>{product.name}</h2>
                                        </RouterLink>
                                        <div className='rate'>
<h3>
                                            {Array.from({ length: product.rating }, (_, i) => (
                                                <i key={i} className="las la-star"></i>
                                            ))}
                                            <span> ({product.reviews}) </span>
                                        </h3>                                             </div>
                                        <div className='options'>
                                            <h4 className='price'> <span> L.E </span> {product.price} </h4>
                                            <RouterLink to={`/kroo-qr-menu/product?id=${product.id}`}>
                                            <i className="las la-plus"></i></RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='section-header'></div>
                </div>
            </section>
        </>
    );
}

export default Category;
