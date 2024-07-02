import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './css/product.css';
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

const product_features = [
    { id: 1, name: 'size' },
    { id: 2, name: 'size' },
    { id: 3, name: 'size' },
    { id: 4, name: 'size' },

    { id: 5, name: 'extra' }
];

const product_sub_features = [
    { id: 1, product_feature_id: 1, name: 'medium', integ : 'No adds', price: 0 },
    { id: 2, product_feature_id: 1, name: 'large', integ : 'No adds', price: 5 },
    { id: 3, product_feature_id: 2, name: 'medium', integ : 'No adds', price: 0 },
    { id: 4, product_feature_id: 2, name: 'large', integ : 'No adds', price: 10 },
    { id: 5, product_feature_id: 3, name: 'medium', integ : 'No adds', price: 0 },
    { id: 6, product_feature_id: 3, name: 'large', integ : 'No adds', price: 15 },
    { id: 7, product_feature_id: 4, name: 'medium', integ : 'No adds', price: 0 },
    { id: 8, product_feature_id: 4, name: 'large', integ : 'No adds', price: 20 },
    { id: 9, product_feature_id: 5, name: 'Add Milk', integ : 'No adds', price: 15 },
    { id: 10, product_feature_id: 5, name: 'Add Flavor', integ : 'No adds', price: 15 },
    { id: 11, product_feature_id: 5, name: 'Nothing', integ : 'No adds', price: 0 },

];

const products = [
    { id: 1, name: 'espresso', integ : 'No adds', price: 30, img: ProductImg1, rating: 5, reviews: 1, categoryId: 1,feature_ids: [3, 5] },
    { id: 2, name: 'americano', integ : 'No adds', price: 50, img: ProductImg2, rating: 5, reviews: 1, categoryId: 1, feature_ids: [1, 5] },
    { id: 3, name: 'machiato', integ : 'No adds', price: 45, img: ProductImg3, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 4, name: 'turkish coffee', integ : 'No adds', price: 40, img: ProductImg4, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 5, name: 'turkish hazelnut', integ : 'No adds', price: 50, img: ProductImg5, rating: 5, reviews: 1, categoryId: 1, feature_ids: [ 5] },
    { id: 6, name: 'french coffee', integ : 'No adds', price: 50, img: ProductImg6, rating: 5, reviews: 1, categoryId: 1, feature_ids: [ 5] },
    { id: 7, name: 'cappuccino', integ : 'No adds', price: 60, img: ProductImg7, rating: 5, reviews: 1, categoryId: 1, feature_ids: [1, 5] },
    { id: 8, name: 'latte', integ : 'No adds', price: 60, img: ProductImg8, rating: 5, reviews: 1, categoryId: 1, feature_ids: [1, 5] },
    { id: 9, name: 'flat white', integ : 'No adds', price: 65, img: ProductImg9, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 10, name: 'mocha', integ : 'No adds', price: 50, img: ProductImg10, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 11, name: 'tea', integ : 'No adds', price: 20, img: ProductImg11, rating: 5, reviews: 1, categoryId: 1, feature_ids: [4, 5] },
    { id: 12, name: 'nescafe', integ : 'No adds', price: 30, img: ProductImg12, rating: 5, reviews: 1, categoryId: 1, feature_ids: [ 5] },
    { id: 13, name: 'sahlab', integ : 'No adds', price: 50, img: ProductImg13, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 14, name: 'spanish latte', integ : 'No adds', price: 65, img: ProductImg14, rating: 5, reviews: 1, categoryId: 1, feature_ids: [ 5] },
    { id: 15, name: 'hot chocolate', integ : 'No adds', price: 60, img: ProductImg15, rating: 5, reviews: 1, categoryId: 1, feature_ids: [2, 5] },
    { id: 16, name: 'ice mocha', integ : 'No adds', price: 70, img: ProductImg16, rating: 5, reviews: 1, categoryId: 2, feature_ids: [2, 5] },
    { id: 17, name: 'ice latte', integ : 'No adds', price: 65, img: ProductImg17, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 18, name: 'frappuccino', integ : 'No adds', price: 65, img: ProductImg18, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 19, name: 'latte frappe', integ : 'No adds', price: 65, img: ProductImg19, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 20, name: 'mocha frappe', integ : 'No adds', price: 65, img: ProductImg20, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 21, name: 'smoothie', integ : 'No adds', price: 60, img: ProductImg21, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 22, name: 'lemon mint', integ : 'No adds', price: 50, img: ProductImg22, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 23, name: 'mohito', integ : 'No adds', price: 60, img: ProductImg23, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 24, name: 'sunshine mint', integ : 'No adds', price: 65, img: ProductImg24, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 25, name: 'soft drink', integ : 'No adds', price: 25, img: ProductImg25, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 26, name: 'ice tea', integ : 'No adds', price: 55, img: ProductImg26, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 27, name: 'water', integ : 'No adds', price: 15, img: ProductImg27, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ ] },
    { id: 28, name: 'strawberry tango', integ : 'No adds', price: 70, img: ProductImg28, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
    { id: 29, name: 'redbull', integ : 'No adds', price: 55, img: ProductImg29, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ ] },
    { id: 30, name: 'ice spanish latte', integ : 'No adds', price: 75, img: ProductImg30, rating: 5, reviews: 1, categoryId: 2, feature_ids: [ 5] },
];

function Product() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const product = products.find(p => p.id === parseInt(id));
    const features = product ? product_features.filter(f => product.feature_ids.includes(f.id)) : [];
    const subFeatures = features.map(feature => ({
        feature,
        subFeatures: product_sub_features.filter(sf => sf.product_feature_id === feature.id)
    }));

    const [quantity, setQuantity] = useState(1);
    const [basePrice] = useState(product ? product.price : 0); // Initial base price from the product
    const [sizePrice, setSizePrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(basePrice);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [selectedFeaturePrices, setSelectedFeaturePrices] = useState({}); // State to track the selected feature prices

    const [stateChange, setStateChange] = useState(1);



    useEffect(() => {
        // Calculate and update the total price
        const selectedFeaturePrice = Object.values(selectedFeaturePrices).reduce((acc, price) => acc + price, 0);
        setTotalPrice((basePrice + sizePrice + selectedFeaturePrice) * quantity);
    }, [quantity, sizePrice, basePrice, selectedFeaturePrices]);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleSizeChange = (event) => {
        const selectedSizePrice = parseFloat(event.target.nextSibling.innerText.split(' ')[1]) || 0;
        setSizePrice(selectedSizePrice);
    };

    const handleFeatureChange = (event, featureId) => {
        const selectedFeaturePrice = parseFloat(event.target.dataset.price) || 0;
        setSelectedFeaturePrices(prevPrices => ({
            ...prevPrices,
            [featureId]: selectedFeaturePrice
        }));
    };

    const handleBookmark = () => {
        if (!product) return;
    
        const selectedSizeElement = document.querySelector('input[name="size"]:checked');
        const size = selectedSizeElement ? selectedSizeElement.nextSibling.innerText : 'Default Size';
        const productLink = window.location.pathname;
        const productImage = product.img;
    
        let bookmarkedProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
    
        const existingProduct = bookmarkedProducts.find(p => p.id === product.id);
    
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            const productDetails = {
                id: product.id, // Store the product ID
                name: product.name,
                quantity: quantity,
                size: size,
                price: totalPrice.toFixed(2),
                link: productLink,
                img: productImage
            };
    
            bookmarkedProducts.push(productDetails);
        }
    
        localStorage.setItem('bookmarkedProducts', JSON.stringify(bookmarkedProducts));

        
    };

    

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <section className='product-page'>
                <img src={product.img} alt='product img' />
                <div className='product-content'>
                    <h1>{product.name}</h1>

                    <div className='rate'>
                        <h3><i className="las la-star"></i> {product.rating} <span> ({product.reviews}) </span></h3>
                    </div>

                    <div className='whatsin'>
                    {
                        product.integ.split(",").map((integr, index) => (
                            <span key={index}>
                                {integr}
                            </span>
                        ))
                    }

                        
                    </div>

                    <div className='add-min'>
                        <h2> Quantity </h2>

                        <div>
                            <button className='increase-num' onClick={handleIncrease}><i className="las la-plus"></i></button>
                            <span className="quantity">{quantity}</span>
                            <button className='decrease-num' onClick={handleDecrease}><i className="las la-minus"></i></button>
                        </div>
                    </div>

                    {features.map(({ id, name }) => (
                        <div className='integ' key={id}>
                            <h2>{name}</h2>
                            <ul>
                                {subFeatures.find(sf => sf.feature.id === id).subFeatures.map(subFeature => (
                                    <li key={subFeature.id}>
                                        <div>
                                            <input
                                                type='radio'
                                                name={`feature-${id}`}
                                                value={subFeature.name}
                                                data-price={subFeature.price}
                                                defaultChecked={subFeature.price === 0}
                                                onChange={(e) => handleFeatureChange(e, id)}
                                            />
                                            <label>{subFeature.name}</label>
                                        </div>
                                        <span> + {subFeature.price} L.E </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className='options'>
                        <button className='add-to-bookmark' onClick={handleBookmark}> <i className="las la-bookmark"></i> Add Order </button>
                        <h4>
                            <span> Total Price</span>
                            <h6>{totalPrice.toFixed(2)}</h6> L.E
                        </h4>
                    </div>

                    <div className='section-header'></div>
                </div>
            </section>
        </>
    );
}

export default Product;