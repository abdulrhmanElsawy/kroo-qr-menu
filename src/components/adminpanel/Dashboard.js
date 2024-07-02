import './css/dashboard.css';
import React, {useState,useEffect} from "react";
import Chart from 'react-apexcharts';
import { Link as RouterLink } from 'react-router-dom';
import axios from '../../config/index'; 



function Dashboard(){

    const [userId, setUserId] = useState(0);



    useEffect(() => {
        const fetchSessionData = async () => {


            try {
                const response = await axios.get('/session');

                if (response.data && response.data.valid) {
                    setUserId(response.data.userId)
                } else {
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchSessionData();
    }, []); 




    const [item1Count, setItem1Count] = useState(0);
    const [item2Count, setItem2Count] = useState(0);
    const [item3Count, setItem3Count] = useState(0);
    const [item4Count, setItem4Count] = useState(0);

    
    const [item5Count, setItem5Count] = useState(0);
    const [item6Count, setItem6Count] = useState(0);
    const [item7Count, setItem7Count] = useState(0);
    const [item8Count, setItem8Count] = useState(0);

    const getItemCount = (tableName, setCount) => {
        axios.post('get-item-count', {
            table: tableName,
        })
        .then((res) => {
            if (res.data && res.data.totalCount !== undefined) {
                setCount(res.data.totalCount);
            } else {
                setCount(0);
                console.log("Error happened or data is empty");
            }
        })
        .catch((err) => {
            setCount(0);
            console.log(err);
        });
    };
    


    
    useEffect(() => {
        getItemCount('tablename', setItem1Count);
        getItemCount('tablename', setItem2Count);
        getItemCount('tablename', setItem3Count);
        getItemCount('tablename', setItem4Count);
        getItemCount('tablename', setItem5Count);
        getItemCount('tablename', setItem6Count);
        getItemCount('tablename', setItem7Count);
        getItemCount('tablename', setItem8Count);


    }, []);


    
    const [items1, setItem1] = useState([]);
    const [items2, setItem2] = useState([]);
    const [items3, setItem3] = useState([]);
    const [items4, setItem4] = useState([]);
    const [items5, setItem5] = useState([]);


    const getAllItems = (tableName, setItems) => {
        axios.post("AllItems", {
            table: tableName,
        })
        .then((res) => {
            if (res.data) {
                setItems(res.data.length ? res.data : []);
            } else {
                setItems([]);
                console.log("Error happened or data is empty");
            }
        })
        .catch((err) => {
            setItems([]);
            console.log(err);
        });
    };
    



    
    
    useEffect(() => {
        getAllItems('tablename', setItem1);
        getAllItems('tablename', setItem2);
        getAllItems('tablename', setItem3);
        getAllItems('tablename', setItem4);
        getAllItems('tablename', setItem5);

    }, []);



    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');


    const handleSort = (column) => {
        if (sortColumn === column) {
        // Toggle sort direction if the same column is clicked again
        setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
        } else {
        // Set the new column to sort and default direction to ascending
        setSortColumn(column);
        setSortDirection('asc');
        }
    };
    
    const sortedItem1 = [...items1].sort((a, b) => {
        const compareValue = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? compareValue : -compareValue;
    });


    const sortedItem2 = [...items2].sort((a, b) => {
        const compareValue = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? compareValue : -compareValue;
    });

    const sortedItem3 = [...items3].sort((a, b) => {
        const compareValue = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? compareValue : -compareValue;
    });



    const sortedItem4 = [...items4].sort((a, b) => {
        const compareValue = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? compareValue : -compareValue;
    });


    const sortedItem5 = [...items5].sort((a, b) => {
        const compareValue = a[sortColumn] - b[sortColumn];
        return sortDirection === 'asc' ? compareValue : -compareValue;
    });



    


    
    // Function to extract product quantities and group them
    const extractProductQuantities = (data) => {
        const sums = data
            .map(item => item.product_quantities)
            .map(curr => curr.split(",").map(Number))
            .map(currarray => currarray.reduce((sum, value) => sum + value, 0));
    
        const totalGroups = Math.ceil(sums.length / 5);
        const groupedSums = Array.from({ length: totalGroups }, (_, groupIndex) => {
            const start = groupIndex * 5;
            const end = start + 5;
            return sums.slice(start, end).reduce((groupSum, value) => groupSum + value, 0).toString(); // Convert sum to string here
        });
    
        return groupedSums.reduce((acc, sum) => {
            acc.push(sum);
            return acc;
        }, []);
    };


    
    const [state, setState] = useState({
        options: {
            colors: ['#1791c8', '#8BC34A', '#E91E63'],
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [2024, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: []
    });

    useEffect(() => {
        // Extract and transform the data
        const ViewsData = extractProductQuantities(items5);

        const viewsDatatransformed = {
            data: ViewsData.map(Number) // Change this to your specific values if needed
        };


        // Update the state with the new data
        setState({
            options: {
                colors: ['#1791c8'],
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                }
            },
            series: [
                {
                    name: "Views",
                    data: viewsDatatransformed.data
                }
                
            ]
        });
    }, [items5]);



return(
        <>
            <div className='dashboard-container active'>
                <div className='dashboard-content active'>
                    
                    <div className='container-fluid'>
                        <div className='row'>

                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                
                                <div className='dash-num-stats'>

                                    <div className='stat'>
                                        <i class="las la-luggage-cart"></i>
                                        <div className='text'>
                                            <h3>  {item1Count} </h3>
                                            <h4> Name </h4>
                                        </div>
                                    </div>

                                    <div className='stat'>
                                        <i class="las la-money-bill-wave"></i>
                                        <div className='text'>
                                            <h3> {item2Count} </h3>
                                            <h4> Name </h4>
                                        </div>
                                    </div>


                                    <div className='stat'>
                                        <i class="las la-upload"></i>
                                        <div className='text'>
                                            <h3> {item3Count} </h3>
                                            <h4> Name </h4>
                                        </div>
                                    </div>

                                    <div className='stat'>
                                        <i class="las la-download"></i>
                                        <div className='text'>
                                            <h3> {item4Count} </h3>
                                            <h4> Name </h4>
                                        </div>
                                    </div>

                                </div>

                            </div>



                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>

                                <div className='dash-num'>


                                <RouterLink to="/link">
                                    <div className='num'>
                                        <div className='text'>
                                            <h2> {item5Count} </h2>
                                            <h4> Name </h4>
                                        </div>

                                        <i class="las la-user"></i>
                                    </div>
                                </RouterLink>

                                <RouterLink to="/link">
                                    <div className='num'>
                                        <div className='text'>
                                            <h2> {item6Count} </h2>
                                            <h4> Name </h4>
                                        </div>

                                        <i class="las la-user-tie"></i>
                                    </div>
                                </RouterLink>


                                <RouterLink to="/link">
                                <div className='num'>
                                    <div className='text'>
                                        <h2> {item7Count} </h2>
                                        <h4> Name </h4>
                                    </div>

                                    <i class="las la-file-invoice"></i>
                                </div>
                                </RouterLink>


                                <RouterLink to="/link">

                                <div className='num'>
                                    <div className='text'>
                                        <h2> {item8Count} </h2>
                                        <h4> Name </h4>
                                    </div>

                                    <i class="las la-file-invoice-dollar"></i>
                                </div>
                                </RouterLink>


                                </div>
                            </div>


                            <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                                <div className='dash-chart'>
                                    <div className='header'>
                                        <h1> Last 10 Days Views </h1>
                                    </div>

                                    <Chart
                                        options={state.options}
                                        series={state.series}
                                        type="area"
                                        width="100%"
                                    />


                                </div>
                            </div>

                            <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                                <div className='dash-products'>
                                    <div className='header'>
                                        <h1> Name </h1>
                                    </div>

                                    <table>
                                        <thead>
                                        <tr>
                                            <th><button className='id-filter' onClick={() => handleSort('id')}> Sno </button></th>
                                            <th><button className='name-filter' onClick={() => handleSort('name')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'name' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Products
                                            </button></th>
                                            <th><button className='price-filter' onClick={() => handleSort('price')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'price' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> Price
                                            </button></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedItem1.slice(0, 6).map((item1) => (
                                            <tr key={item1.id}>
                                                <td><h6>{item1.id}</h6></td>
                                                <td><img src={`./uploads/${item1.img}`} alt="item1 image" /><h5>{item1.name}</h5></td>
                                                <td><h6>${item1.price}</h6></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>




                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <div className='dash-products'>
                                    <div className='header'>
                                        <h1> Name</h1>
                                    </div>

                                    <table>
                                        <thead>
                                        <tr>
                                            <th><button className='id-filter' onClick={() => handleSort('id')}> # </button></th>
                                            <th><button className='code-filter' onClick={() => handleSort('code')}> name </button></th>
                                            <th><button className='name-filter' onClick={() => handleSort('name')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'name' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> warehouse
                                            </button></th>
                                            <th><button className='price-filter' onClick={() => handleSort('price')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'price' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> location
                                            </button></th>

                                            <th><button className='brand-filter' onClick={() => handleSort('brand')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'brand' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> set
                                            </button></th>

                                            <th><button className='cat_name-filter' onClick={() => handleSort('cat_name')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'cat_name' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> product name
                                            </button></th>
                                            <th><button className='exp_date-filter' onClick={() => handleSort('exp_date')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'exp_date' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> quantity
                                            </button></th>

                                            <th><button className='exp_date-filter' onClick={() => handleSort('exp_date')}>
                                            <i className={`las la-arrows-alt-v ${sortColumn === 'exp_date' && sortDirection === 'asc' ? 'asc' : 'desc'}`}></i> remain quantity
                                            </button></th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedItem2.slice(0, 6).map((item2) => (
                                            <tr key={item2.id}>
                                            <td><h6>{item2.id}</h6></td>

                                            <td><h6>{item2.name}</h6></td>
                                                    <td><h6>{item2.quantity}</h6></td>
                                                    <td><h6>{item2.quantity}</h6></td>
                                                    <td><h6>{item2.quantity}</h6></td>
                                                    <td><h6>{item2.quantity}</h6></td>
                                                    <td><h6>{item2.quantity}</h6></td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>






                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard;