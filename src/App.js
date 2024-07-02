import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './components/Header';
import CategoriesSlider from './components/CategoriesSlider';
import PopProductsSlider from './components/PopProductsSlider';
import MainCategories from './components/MainCategories';
import CatProducts from './components/CatProducts';
import DownNav from './components/DownNav';
import Search from './components/Search';
import Category from './components/Category';
import Product from './components/Product';
import Cart from './components/Cart';
import PopularProducts from './components/PopularProducts';
import Badge from './components/Badge';
import SectionHeader from './components/SectionHeader';

    




function App() {

return (
    <div className="App">

            <Routes>

            <Route path="/kroo-qr-menu/" element={
                <>
                <Badge />
                <Header />
                <Search />
                <CategoriesSlider />
                <PopProductsSlider />
                <MainCategories />
                <CatProducts />
                <SectionHeader />
                <DownNav />


                </>
            } />


            <Route path="/kroo-qr-menu/popular-products" element={
                <>
                <Badge />

                <PopularProducts />
                <SectionHeader />

                <DownNav />


                </>
            } />



            
            <Route path="/kroo-qr-menu/category" element={
                <>
                <Badge />

                <Search className="nomargin"/>
                <Category />
                <SectionHeader />

                <DownNav />


                </>
            } />


        <Route path="/kroo-qr-menu/product" element={
                <>
                <Badge />

                <Product />
                <SectionHeader />

                <DownNav />


                </>
            } />


            
        <Route path="/kroo-qr-menu/bookmark" element={
                <>
                <Badge />

                <Cart />
                <SectionHeader />

                <DownNav />


                </>
            } />



        </Routes>


    </div>
);
}

export default App;
