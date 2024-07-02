import './css/navbar.css';

import UserImg from './images/mine.jpg';
import { useNavigate,useLocation, Router } from 'react-router-dom';
import axios from '../../config/index'; // Adjust the import path as needed
import { useEffect,useState,useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Navbar(){
    const [userId, setUserId] = useState(0);
    const [users, setAllUsers] = useState([]);
    const location = useLocation();

    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchSessionData = async () => {


            try {
                const response = await axios.get('/session');

                if (response.data && response.data.valid) {
                    setUserId(response.data.userId)

                } else {
                    navigate('/');
                }
            } catch (error) {
                navigate('/'); // Navigate on error as well
            }
        };

        fetchSessionData();
    }, [location.pathname]); 




    const handleMaxScreenClick = () => {
        const doc = window.document;
        const docEl = doc.documentElement;
    
        // Check if the document is currently in fullscreen
        const isFullscreen = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
    
        // If not in fullscreen, request fullscreen; otherwise, exit fullscreen
        if (!isFullscreen) {
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
        } else {
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        }
    };


    
    const getAllUsers = () => {
        axios.post("AllUsers", {
            table: "users",
        })
        .then((res) => {
            if (res.data && Array.isArray(res.data)) {
                setAllUsers(res.data);
            } else {
                console.log("Error happened or no data received");
                setAllUsers([]);
            }
        })
        .catch((err) => {
            console.log(err);
            setAllUsers([]);
        });
    };

    
    useEffect(() => {
        getAllUsers();


    }, []);



    
    const [notificationsCount, setNotificationsCount] = useState([]);


    const getNotificationsCount = () => {
        axios.post('get-notifications-count', {
            table: 'notifications',
            status: 'unseen' 
        })
        .then((res) => {
            if (res.data && res.data.totalCount !== undefined) {
                setNotificationsCount(res.data.totalCount);
            } else {
                setNotificationsCount(0);
                console.log("Error happened or data is empty");
            }
        })
        .catch((err) => {
            setNotificationsCount(0);
            console.log(err);
        });
    };

    
    useEffect(() => {
        // Call the function immediately
        getNotificationsCount();

        // Set interval to call the function every 10 seconds
        const intervalId = setInterval(getNotificationsCount, 10000); // 10000 ms = 10 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const tables = document.getElementsByTagName('table');
    
        for (let table of tables) {
        const rows = table.getElementsByTagName('tr');
    
        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let matches = false;
    
            for (let cell of cells) {
            const cellValue = cell.textContent || cell.innerText;
            if (cellValue.toLowerCase().includes(query)) {
                matches = true;
                break;
            }
            }
    
            row.style.display = matches ? '' : 'none';
        }
        }
    };
    
    return(
        <>
        {users.length > 0 && (
            <nav>
                <div className='nav-content active'>
                    <div className='search'>
                        <button type='button' aria-label='search-btn'>  <i class="las la-search"></i> </button>
                        <input type='text' onChange={handleSearch} required placeholder='Search' />
                    </div>

                    {users[0].type !== 'admin' && (

                    <div className='nav-settings'>
                        <button className='langs'>
                            <i class="las la-globe"></i>
                        </button>

                        <button className='max-screen' onClick={handleMaxScreenClick}>
                            <i class="las la-search-plus"></i>
                        </button>

                        <RouterLink to='/notifications'>
                            <i class="las la-bell"></i>
                            <span className='number'> {notificationsCount} </span>
                        </RouterLink>

                        <RouterLink to="/user-settings" className='settings'>
                            <i class="las la-cog"></i>
                        </RouterLink>

                        <div className='user-info'>
                            <img src={`./uploads/${users[0].profile_img}`} alt='user img' />
                            <div className='info'>
                                <h3> {users[0].fullname} </h3>
                                <h4> {users[0].email} </h4>
                            </div>

                        </div>

                    </div>

                    )}

                </div>
            </nav>
            )}
        </>
    )
}

export default Navbar;