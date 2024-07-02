import '../css/products.css';
import { Router, Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import ProductImg1 from '../images/products/1_0.webp';
import ProductImg2 from '../images/products/2_1.webp';
import ProductImg3 from '../images/products/3_2.webp';
import ProductImg4 from '../images/products/4_3.webp';
import ProductImg5 from '../images/products/5_4.webp';
import ProductImg6 from '../images/products/6_5.webp';
import $ from "jquery"; // Import jQuery if not already imported

import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import axios from '../../../config/index'; // Adjust the import path as needed


function Categories(){

    const [categories, setAllCategories] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortedItems, setSortedItems] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [productFilter, setProductFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

    const [searchInput, setSearchInput] = useState('');

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    // Function to calculate the total number of pages
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    
    const getAllCategories = () => {
        axios.post("AllItems", {
            table: "categories",
        })
        .then((res) => {
            if (res.data) {
                const categories = res.data.map(category => ({
                    ...category,
                    name: category.name || 'Unknown Category',
                    code: category.code || 'No Code',
                    description: category.description || 'No Description',
                    img: category.img || 'default_image.webp'
                }));
                setAllCategories(categories);
                setSortedItems(categories);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };

    
    useEffect(() => {
        getAllCategories();

    }, []);

    



    const [isFilterActive, setFilterActive] = useState(false);

    const toggleFilter = () => {
    setFilterActive(!isFilterActive);
    };

    useEffect(() => {
    const openFilterButton = document.querySelector('.open-filter');
    openFilterButton.addEventListener('click', toggleFilter);

    return () => {
        openFilterButton.removeEventListener('click', toggleFilter);
    };
    }, [isFilterActive]);
    





    const handleProductFilter = (value) => {
    setProductFilter(value);
    };

    const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
    };

    
    const handleBrandFilter = (value) => {
        setBrandFilter(value);
        };

        
        
    const handlePriceFilter = (value) => {
        setPriceFilter(value);
        };
    

    const handleSearch = (value) => {
    setSearchInput(value);
    };

    const applyFilters = (product) => {
        return (
            (categoryFilter === '' || product.cat_name.toLowerCase() === categoryFilter.toLowerCase()) &&
            (brandFilter === '' || product.brand.toLowerCase() === brandFilter.toLowerCase()) &&
            (priceFilter === '' || product.price == priceFilter) &&
            (searchInput === '' || product.cat_name.toLowerCase().includes(searchInput.toLowerCase()))
        );
    };

    const noResultsMessage = (
        <tr>
            <td colSpan="10">No results found for the given search criteria.</td>
        </tr>
    );

    const currentPageItems = currentItems.length > 0 ? currentItems : sortedItems.slice(0, itemsPerPage);


    const handleSort = (column) => {

        const newsortedItems = [...categories].sort((a, b) => {
            const compareValue = a[column] - b[column];
            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

    setSortedItems(newsortedItems);
    setSortColumn(column);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    };

    

        // Existing states and functions

    // PDF Download Function without images
    const downloadPDF = async () => {
        const input = document.getElementById('table-to-xport');
        const originalStyle = input.style.cssText;
    
        // Temporarily adjust table style for PDF output
        input.style.cssText += 'img { display: none !important; }'; // Hide images
        input.style.cssText += 'font-size: 10px;'; // Smaller font size
        input.style.cssText += 'padding: 5px;'; // Reduce padding
    
        // Ensure the entire table is visible
        html2canvas(input, {
            scale: 1, // Adjust scale as needed
            useCORS: true,
            logging: true,
            width: input.scrollWidth,
            height: input.scrollHeight,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("download.pdf");
            input.style.cssText = originalStyle; // Restore original styles
        });
    };


    // Excel Download Function
    const downloadExcel = () => {
        const worksheet = XLSX.utils.table_to_sheet(document.getElementById('table-to-xport'));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "download.xlsx");
    };

    // Print Function without images
    const printTable = () => {
        const input = document.getElementById('table-to-xport');
        const originalStyle = input.style.cssText;
        input.style.cssText += 'img { display: none !important; }'; // Temporarily hide images
        const content = input.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = content;
        window.print();
        document.body.innerHTML = originalContents;
        input.style.cssText = originalStyle; // Restore original styles
    };



    const [users, setAllUsers] = useState([]);
    const getAllUsers = () => {
        axios.post("AllUsers", {
            table: "users",
        })
        .then((res) => {
            if (res.data) {
                const users = res.data.map(user => ({
                    ...user,
                    fullname: user.fullname || 'Unknown User'
                }));
                setAllUsers(users);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };
    

    
    useEffect(() => {
        getAllUsers();


    }, []);

    
    

    const deleteItem = (id) => {
        axios
        .delete(`delete-item/${id}`, {
            data: {
            table: 'categories',
            },
        })
        .then((response) => {
            if (response.data.message === 'Item deleted successfully') {
                getAllCategories();
            } else {
            console.error('Failed to delete result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error deleting result:', error);
        });
    };




return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>

                    <div className='page-header'>
                        <div className='text'>
                            <h1> Products Category List  </h1>
                            <h2> View/Search product Category </h2>
                        </div>

                        <RouterLink to='/add-category' className='add-item'>
                            <i class="las la-plus"></i>
                            Add Category
                        </RouterLink>
                    </div>


                    



                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <div className='dash-products'>
                                    <div className='header'>
                                        <div className='left'>
                                            <button className={`open-filter ${isFilterActive ? 'active' : ''}`}> 
                                                <i class={`las la-${isFilterActive ? 'times' : 'filter'}`}></i> 
                                            </button>
                                            <div className='search'>
                                                <button className='search-filters' onClick={() => handleSearch(searchInput)}> <i class="las la-search"></i> </button>
                                                <input type='text' placeholder='Search...' value={searchInput} onChange={(e) => handleSearch(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className='right'>
                                        <button className='download-pdf' onClick={downloadPDF}>
                                                <i class="las la-file-pdf"></i>
                                            </button>
                                            <button className='download-excel' onClick={downloadExcel}>
                                                <i class="las la-file-csv"></i>
                                            </button>
                                            <button className='download-print' onClick={printTable}>
                                                <i class="las la-print"></i>
                                            </button>
                                        </div>
                                    </div>


                                    <div className={`filters ${isFilterActive ? 'active' : ''}`}>
                                            <select className='product-filter' onChange={(e) => handleProductFilter(e.target.value)}>
                                            

                                        </select>
                                        <select className='category-filter' onChange={(e) => handleCategoryFilter(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            

                                        </select>
                                        <select >
                                            <option value="">Choose Sub Category</option>

                                        </select>
                                        <select onChange={(e) => handleBrandFilter(e.target.value)}>
                                            <option value=""> Brand</option>

                                        </select>


                                        <button className='search-filters'>
                                            <i class="las la-search"></i> 
                                        </button>
                                    </div>

                                    <table id="table-to-xport">
                                        <thead>
                                        <tr>
                                            <th> <input type='checkbox' className='select-all' /> </th>

                                            <th><button className='name-filter' onClick={() => handleSort('name')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'name' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Category name
                                            </button></th>
                                            <th><button className='cat_code-filter' onClick={() => handleSort('cat_code')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'cat_code' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Category Code
                                            </button></th>

                                            <th><button className='description-filter' onClick={() => handleSort('description')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'description' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Description
                                            </button></th>

                                            <th><button className='created_by-filter' onClick={() => handleSort('created_by')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'created_by' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Created By
                                            </button></th>


                                            <th><button className='action-filter' onClick={() => handleSort('action')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'action' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Action
                                            </button></th>


                                        </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length > 0 ? (
                                                currentItems.filter(applyFilters).map((category) => (
                                                    <tr key={category.id}>
                                                        <td> <input type='checkbox' className='select-product' /> </td>
                                                        <td>
                                                            <img src={`./uploads/${category.img}`} alt="product image" onError={(e) => e.target.src = 'default_image.webp'} />
                                                            <h5>{category.name || 'Unknown Category'}</h5>
                                                        </td>
                                                        <td><h6>{category.code || 'No Code'}</h6></td>
                                                        <td><h6>{category.description || 'No Description'}</h6></td>
                                                        <td><h6>{users.find(user => user.user_id === category.user_id)?.fullname || 'Unknown User'}</h6></td>
                                                        <td>
                                                            <a href="#">
                                                                <i class="las la-eye"></i>
                                                            </a>
                                                            <RouterLink to={`/update-category?id=${category.id}`}>
                                                                <i class="las la-edit"></i>
                                                            </RouterLink>
                                                            <button onClick={() => deleteItem(category.id)}>
                                                                <i className="las la-trash-alt"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                noResultsMessage
                                            )}
                                            </tbody>
                                    </table>


                                    <div className='table-pages-num'>
                                        <div className='show-per-page'>
                                        <label>Show per page : </label>
                                        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                        </select>
                                        </div>

                                        <div className='page-num'>
                                            <label>{`${indexOfFirstItem + 1}-${indexOfFirstItem + currentPageItems.length} of ${sortedItems.length} items`}</label>
                                            <div>
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <button key={index + 1} className={`page-num-${index + 1}`} onClick={() => setCurrentPage(index + 1)}>
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>



                </div>
            </div>
        </>
    )
}

export default Categories;