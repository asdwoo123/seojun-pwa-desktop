import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import InitialScreen from "./component/initial/InitialScreen";
import MainScreen from "./component/main/MainScreen";



const Root = (props) => {
    const pathname = props.location.pathname;
    if (pathname === '/') {
        props.history.push('/login');
    }
    return (
        <Fragment>
            <Route path="/login" component={InitialScreen} />
            <Route path="/join" component={InitialScreen} />
            <Route path="/main" component={MainScreen} />
        </Fragment>
    );
};

export default withRouter(Root);
