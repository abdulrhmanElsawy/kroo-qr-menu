import './css/header.css';
import {Swiper,SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Autoplay,Navigation,Pagination} from 'swiper';



import Img1 from './images/restr/1.webp';
import Img2 from './images/restr/2.webp';
import Img3 from './images/restr/3.webp';
import Img4 from './images/restr/4.webp';

import Logo from './images/logo/logo.webp';


function Header(){
    return(
        <>
            <section className='header'>

                <div className='images-slider'>
                    <h1>  KROO  MENU </h1>
                    <h2> Creative Collective </h2>
                    <div className='overlay'></div>
                    <div className='slider'>
                    <Swiper grabCursor={true} spaceBetween={50} slidesPerView={1} navigation={{
                        nextEl: '.next-btn',
                        prevEl: '.prev-btn',
                        
                        }} 
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={false}
                            
                            modules={[Autoplay,Navigation,Pagination]}
                        >

                        <SwiperSlide>
                            <img src={Img1} alt='cover image' />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={Img2} alt='cover image' />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={Img3} alt='cover image' />
                        </SwiperSlide>

                        <SwiperSlide>
                            <img src={Img4} alt='cover image' />
                        </SwiperSlide>

                        </Swiper>
                    </div>
                </div>


                <div className='container'>
                    <div className='header-content'>


                            <div className='logo'>
                                <img src={Logo} alt='logo' />
                            </div>
                            
                        <ul>
                            <li>
                                <a href='https://maps.app.goo.gl/EeThXNVSJbokqtUV7' target='_blnak'>
                                    <i class="fa-solid fa-location-dot"></i>
                                </a>
                            </li>

                            <li>
                                <a href='https://www.facebook.com/KROO.CC/' target='_blnak'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                            </li>

                            {/* <li>
                                <a href='#' target='_blnak'>
                                    <i class="fa-brands fa-x-twitter"></i>
                                </a>
                            </li> */}

                            
                            <li>
                                <a href='https://www.instagram.com/kroo.cc/' target='_blnak'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </li>
{/* 
                            <li>
                                <a href='#' target='_blnak'>
                                <i class="fa-brands fa-tiktok"></i>
                                </a>
                            </li> */}

                            {/* <li>
                                <a href='#' target='_blnak'>
                                <i class="fa-brands fa-youtube"></i>
                                </a>
                            </li> */}

                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;