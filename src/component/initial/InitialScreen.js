import React from 'react';
import Image from 'react-graceful-image';
import LoginScreen from "./LoginScreen";
import { Route } from 'react-router-dom';
import { Typography } from 'antd';
import SignUpScreen from "./SignUpScreen";


const { Title } = Typography;

const InitialScreen = (props) => {
    return (
        <div className="full">
            <Image
                src="imimim"
                width="50%"
                height="100%"
                alt="login && sign up"
            />
            <div style={{ display: "flex", float: "right", width: '50%', height: '100%', justifyContent: "center",
                alignItems: "center", flexDirection: "column" }}>
                <Title >SEOJUN ENG</Title>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/join" component={SignUpScreen}/>
            </div>
        </div>
    )
};

export default InitialScreen;
