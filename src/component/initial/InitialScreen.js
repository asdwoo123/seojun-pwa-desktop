import React, { Fragment } from 'react';
import LoginScreen from "./LoginScreen";
import { Route } from 'react-router-dom';
import { Typography } from 'antd';
import SignUpScreen from "./SignUpScreen";
import logo from "./logo.svg";
import PasswordScreen from "./PasswordScreen";


const { Title } = Typography;

const InitialScreen = (props) => {
    return (<div className="full">
        {
            (props.windowWidth >= 720) ?
                (
                    <Fragment>
                    <div
                    className="bgg"
                        style={{
                        display: 'inline-block',
                        width: '50%',
                        height: '100%'
                    }}/>
                <div style={{ display: "flex", float: "right", width: '50%', height: '100%', justifyContent: "center",
            alignItems: "center", flexDirection: "column" }}>
            <div>
            <img style={{ width: 90, display: "block", margin: "auto" }} src={logo} alt=""/>
            <Title>SEOJUN ENG</Title>
            </div>
            <Route path="/login" render={() => <LoginScreen {...props}/>}/>
            <Route path="/join" render={() => <SignUpScreen {...props}/>}/>
            <Route path="/password" render={() => <PasswordScreen {...props}/>}/>
            </div></Fragment>
                        ) :
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", height: '100%',
                    justifyContent: "center" }}>
                    <img width={90} src={logo} alt="logo"/>
                    <Title>SEOJUN ENG</Title>
                    <Route path="/login" render={() => <LoginScreen {...props}/>}/>
                    <Route path="/join" render={() => <SignUpScreen {...props}/>}/>
                    <Route path="/password" render={() => <PasswordScreen {...props}/>}/>
                </div>
        }
            </div>)
};

export default InitialScreen;
