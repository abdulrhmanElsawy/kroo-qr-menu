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
                                <a href='https://www.google.com/maps/place/KROO+Creative+Collective/@30.0907085,31.323541,15z/data=!4m6!3m5!1s0x647b0dba92c895c3:0xcd024e50a1729723!8m2!3d30.0907085!4d31.323541!16s%2Fg%2F11tt47yj50?entry=tts&g_ep=EgoyMDI0MDYyNi4wKgksMTAyMTA0NTBIAVAD' target='_blnak'>
                                    <i class="fa-solid fa-location-dot"></i>
                                </a>
                            </li>

                            <li>
                                <a href='#' target='_blnak'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                            </li>

                            <li>
                                <a href='#' target='_blnak'>
                                    <i class="fa-brands fa-x-twitter"></i>
                                </a>
                            </li>

                            
                            <li>
                                <a href='#' target='_blnak'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </li>

                            <li>
                                <a href='#' target='_blnak'>
                                <i class="fa-brands fa-tiktok"></i>
                                </a>
                            </li>

                            <li>
                                <a href='#' target='_blnak'>
                                <i class="fa-brands fa-youtube"></i>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;