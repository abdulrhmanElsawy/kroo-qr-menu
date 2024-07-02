import './css/categoriesslider.css';

import CatImg1 from './images/cats/1.webp';
import CatImg2 from './images/cats/2.webp';
import CatImg3 from './images/cats/3.webp';
import CatImg4 from './images/cats/4.webp';
import CatImg5 from './images/cats/5.webp';
import CatImg6 from './images/cats/6.webp';
import CatImg7 from './images/cats/7.webp';
import CatImg8 from './images/cats/8.webp';


import ProductImg1 from './images/cats/1.webp';
import ProductImg2 from './images/cats/2.webp';
import ProductImg3 from './images/cats/3.webp';
import ProductImg4 from './images/cats/4.webp';
import ProductImg5 from './images/cats/5.webp';
import ProductImg6 from './images/cats/6.webp';
import ProductImg7 from './images/cats/7.webp';
import ProductImg8 from './images/cats/8.webp';

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

function CategoriesSlider() {
    return (
        <>
            <section className='categories-slider'>
                <div className='container'>
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
                                        <RouterLink to={`/category?id=${category.id}`}>
                                            <img src={category.img} alt={category.name} />
                                            <h2>{category.name}</h2>
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

export default CategoriesSlider;
