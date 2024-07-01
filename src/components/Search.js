import React, { useEffect, useState } from 'react';
import './css/search.css';

import $ from 'jquery';
function Search(props) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleSearch = () => {
            const searchContainers = document.querySelectorAll('.search-container-ele');
            searchContainers.forEach(container => {
                const items = container.querySelectorAll('div.col-12');
                
                
                


                items.forEach(item => {
                    if (item.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                        item.style.display = '';
                        if($(".categories-slider").length){
                            const item1 = document.querySelector(".categories-slider");
                            const item2 = document.querySelector(".pop-products");
                            const item3 = document.querySelector(".main-categories");

                            item1.style.display = '';
                        item2.style.display = '';
                        item3.style.display = '';
                        }
                        

                    } else {
                        item.style.display = 'none';

                        if($(".categories-slider").length){
                            const item1 = document.querySelector(".categories-slider");
                            const item2 = document.querySelector(".pop-products");
                            const item3 = document.querySelector(".main-categories");

                            item1.style.display = 'none';
                        item2.style.display = 'none';
                        item3.style.display = 'none';
                        }


                        
                    }
                });
            });
        };

        handleSearch();
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <section className={`search ${props.className}`}>
                <div className='container'>
                    <div className='search-input'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type='text'
                            placeholder=' Search for your product  '
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Search;
