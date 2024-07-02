import '../css/products.css';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

import axios from '../../../config/index'; // Adjust the import path as needed

const Units = () => {
    const [units, setAllUnits] = useState([]);
    const [isFilterActive, setFilterActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortedItems, setSortedItems] = useState([]);

    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({
        product: '',
        category: '',
        brand: '',
        price: '',
        search: ''
    });

    const fetchUnits = useCallback(async () => {
        try {
            const response = await axios.post("AllItems", { table: "units" });
            const unitsData = response.data || []; // Default to an empty array if data is null or undefined
            setAllUnits(unitsData);
            setSortedItems(Array.isArray(unitsData) ? unitsData : []); // Ensure unitsData is an array
        } catch (error) {
            console.error("Error fetching units:", error);
            setAllUnits([]); // Set to an empty array on error
            setSortedItems([]);
        }
    }, []);
    


    useEffect(() => {
        fetchUnits();
    }, [fetchUnits]);

    const toggleFilter = () => setFilterActive(prevState => !prevState);

    useEffect(() => {
        const openFilterButton = document.querySelector('.open-filter');
        openFilterButton.addEventListener('click', toggleFilter);

        return () => openFilterButton.removeEventListener('click', toggleFilter);
    }, [isFilterActive]);

    const applyFilters = (unit) => {
        return (
            (!filters.category || unit.cat_name.toLowerCase() === filters.category.toLowerCase()) &&
            (!filters.brand || unit.brand.toLowerCase() === filters.brand.toLowerCase()) &&
            (!filters.price || unit.price == filters.price) &&
            (!filters.search || unit.unit_name.toLowerCase().includes(filters.search.toLowerCase()))
        );
    };

    const handleSort = (column) => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        const sorted = [...units].sort((a, b) => {
            if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedItems(sorted);
        setSortColumn(column);
        setSortDirection(direction);
    };

    const downloadPDF = async () => {
        const input = document.getElementById('table-to-export');
        const canvas = await html2canvas(input, { scale: 1, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save("download.pdf");
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.table_to_sheet(document.getElementById('table-to-export'));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "download.xlsx");
    };

    const printTable = () => {
        const input = document.getElementById('table-to-export');
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = input.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(sortedItems) ? sortedItems.filter(applyFilters).slice(indexOfFirstItem, indexOfLastItem) : [];



    
    const deleteItem = (id) => {
        axios
        .delete(`delete-item/${id}`, {
            data: {
            table: 'units',
            },
        })
        .then((response) => {
            if (response.data.message === 'Item deleted successfully') {
                fetchUnits();
            } else {
            console.error('Failed to delete result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error deleting result:', error);
        });
    };


    return (
        <div className='dashboard-container active'>
            <div className='dashboard-content active'>
                <div className='page-header'>
                    <div className='text'>
                        <h1>Units List</h1>
                        <h2>Manage your Units</h2>
                    </div>
                    <RouterLink to='/add-unit' className='add-item'>
                        <i className="las la-plus"></i>
                        Add Unit
                    </RouterLink>
                </div>

                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className='dash-products'>
                        <div className='header'>
                            <div className='left'>
                                <button className={`open-filter ${isFilterActive ? 'active' : ''}`}>
                                    <i className={`las la-${isFilterActive ? 'times' : 'filter'}`}></i>
                                </button>
                                <div className='search'>
                                    <button className='search-filters' onClick={() => setFilters({ ...filters, search: filters.search })}>
                                        <i className="las la-search"></i>
                                    </button>
                                    <input
                                        type='text'
                                        placeholder='Search...'
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='right'>
                                <button className='download-pdf' onClick={downloadPDF}>
                                    <i className="las la-file-pdf"></i>
                                </button>
                                <button className='download-excel' onClick={downloadExcel}>
                                    <i className="las la-file-csv"></i>
                                </button>
                                <button className='download-print' onClick={printTable}>
                                    <i className="las la-print"></i>
                                </button>
                            </div>
                        </div>

                        <div className={`filters ${isFilterActive ? 'active' : ''}`}>
                            <input
                                placeholder='Enter Brand Name'
                                className='product-filter'
                                onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                            />
                            <input
                                placeholder='Enter Brand Description'
                                className='product-filter'
                                onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                            />
                            <button className='search-filters'>
                                <i className="las la-search"></i>
                            </button>
                        </div>

                        <table id="table-to-export">
                            <thead>
                                <tr>
                                    <th><input type='checkbox' className='select-all' /></th>
                                    <th>
                                        <button className='name-filter' onClick={() => handleSort('name')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'name' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Unit Name
                                        </button>
                                    </th>
                                    <th>
                                        <button className='description-filter' onClick={() => handleSort('description')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'description' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Unit Description
                                        </button>
                                    </th>
                                    <th>
                                        <button className='action-filter' onClick={() => handleSort('action')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'action' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Action
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((unit) => (
                                        <tr key={unit.id}>
                                            <td><input type='checkbox' className='select-product' /></td>
                                            <td><h6>{unit.name || 'No Name Available'}</h6></td> {/* Default message for empty name */}
                                            <td><h6>{unit.description || 'No Description Available'}</h6></td> {/* Default message for empty description */}
                                            <td>
                                                <a href="#"></a>
                                                <RouterLink to={`/update-unit?id=${unit.id}`}><i className="las la-edit"></i></RouterLink>
                                                
                                                <button onClick={() => deleteItem(unit.id)}>
                                                                <i className="las la-trash-alt"></i>
                                                            </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No results found for the given search criteria.</td>
                                    </tr>
                                )}
                            </tbody>


                        </table>

                        <div className='table-pages-num'>
                            <div className='show-per-page'>
                                <label>Show per page:</label>
                                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div className='page-num'>
                                <label>{`${indexOfFirstItem + 1}-${indexOfFirstItem + currentItems.length} of ${sortedItems.length} items`}</label>
                                <div>
                                    {Array.from({ length: Math.ceil(sortedItems.length / itemsPerPage) }, (_, index) => (
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
    );
};

export default Units;