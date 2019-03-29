import React from 'react';
import axios from 'axios';


const MainScreen = (props) => {
    axios.get('http://192.168.0.22:8000/auth/isLoggedIn').then(res => console.log(res));
    return (
        <div>
            <h1>main screen</h1>
        </div>
    )
};

export default MainScreen;
