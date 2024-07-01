import './css/maincategories.css';

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

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Link as RouterLink } from 'react-router-dom';


const categories = [
    { id: 1, name: 'Hot Drinks', img: CatImg1 },
    { id: 2, name: 'Iced Drinks', img: CatImg2 }
];


const products = [
    { id: 1, name: ' espresso', price: 30, img: ProductImg1, rating: 5, reviews: 1, categoryId: 1 },
    { id: 2, name: ' americano', price: 50, img: ProductImg2, rating: 5, reviews: 1, categoryId: 1 },
    { id: 3, name: ' machiato', price: 45, img: ProductImg3, rating: 5, reviews: 1, categoryId: 1 },
    { id: 4, name: 'turkish coffee ', price: 40, img: ProductImg4, rating: 5, reviews: 1, categoryId: 1 },
    { id: 5, name: ' turkish hazelnut', price: 50, img: ProductImg5, rating: 5, reviews: 1, categoryId: 1 },
    { id: 6, name: 'french coffee ', price: 50, img: ProductImg6, rating: 5, reviews: 1, categoryId: 1 },
    { id: 7, name: 'cappuccino', price: 60, img: ProductImg7, rating: 5, reviews: 1, categoryId: 1 },
    { id: 8, name: ' latte', price: 60, img: ProductImg8, rating: 5, reviews: 1, categoryId: 1 },
    { id: 9, name: ' flat white', price: 65, img: ProductImg9, rating: 5, reviews: 1, categoryId: 1 },
    { id: 10, name: 'mocha ', price: 50, img: ProductImg10, rating: 5, reviews: 1, categoryId: 1 },
    { id: 11, name: ' tea', price: 20, img: ProductImg11, rating: 5, reviews: 1, categoryId: 1 },
    { id: 12, name: ' nescafe', price: 30, img: ProductImg12, rating: 5, reviews: 1, categoryId: 1 },
    { id: 13, name: 'sahlab ', price: 50, img: ProductImg13, rating: 5, reviews: 1, categoryId: 1 },
    { id: 14, name: 'spanish latte ', price: 65, img: ProductImg14, rating: 5, reviews: 1, categoryId: 1 },
    { id: 15, name: ' hot chocolate', price: 60, img: ProductImg15, rating: 5, reviews: 1, categoryId: 1 },

    { id: 16, name: ' ice mocha', price: 70, img: ProductImg16, rating: 5, reviews: 1, categoryId: 2 },
    { id: 17, name: ' ice latte', price: 65, img: ProductImg17, rating: 5, reviews: 1, categoryId: 2 },
    { id: 18, name: ' frappuccino', price: 65, img: ProductImg18, rating: 5, reviews: 1, categoryId: 2 },
    { id: 19, name: ' latte frappe', price: 65, img: ProductImg19, rating: 5, reviews: 1, categoryId: 2 },
    { id: 20, name: ' mocha frappe', price: 65, img: ProductImg20, rating: 5, reviews: 1, categoryId: 2 },
    { id: 21, name: ' smoothie', price: 60, img: ProductImg21, rating: 5, reviews: 1, categoryId: 2 },
    { id: 22, name: ' lemon mint', price: 50, img: ProductImg22, rating: 5, reviews: 1, categoryId: 2 },
    { id: 23, name: ' mohito', price: 60, img: ProductImg23, rating: 5, reviews: 1, categoryId: 2 },
    { id: 24, name: ' sunshine mint', price: 65, img: ProductImg24, rating: 5, reviews: 1, categoryId: 2 },
    { id: 25, name: ' soft drink', price: 25, img: ProductImg25, rating: 5, reviews: 1, categoryId: 2 },
    { id: 26, name: ' ice tea', price: 55, img: ProductImg26, rating: 5, reviews: 1, categoryId: 2 },
    { id: 27, name: ' water', price: 15, img: ProductImg27, rating: 5, reviews: 1, categoryId: 2 },
    { id: 28, name: ' strawberry tango', price: 70, img: ProductImg28, rating: 5, reviews: 1, categoryId: 2 },
    { id: 29, name: ' redbull', price: 55, img: ProductImg29, rating: 5, reviews: 1, categoryId: 2 },
    { id: 30, name: ' ice spanish latte', price: 75, img: ProductImg30, rating: 5, reviews: 1, categoryId: 2 },



    
];


// Helper function to count products in each category
const getCategoryProductCount = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId).length;
};

function MainCategories() {
    return (
        <>
            <section className='main-categories'>
                <div className='container'>
                    <div className='section-header'>
                        <RouterLink to="/categories"></RouterLink>
                        <h1> Categories </h1>
                    </div>
                    <div className='slider'>
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
                            {categories.map((category) => (
                                <SwiperSlide key={category.id}>
                                    <div className='category'>
                                        <RouterLink to={`category?id=${category.id}`}>
                                            <img src={category.img} alt={category.name} />
                                            <div className='text'>
                                                <h2>{category.name}</h2>
                                                <h3>{getCategoryProductCount(category.id)} product</h3>
                                            </div>
                                        </RouterLink>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainCategories;
