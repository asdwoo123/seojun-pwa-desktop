import React, { Fragment, Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import InitialScreen from "./component/initial/InitialScreen";
import MainScreen from "./component/main/MainScreen";
import axios from 'axios';
import ProjectSettingScreen from "./component/main/projectSettings/ProjectSettingScreen";
import { Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocaleActions from './redux/localeReducer';
import windowSize from 'react-window-size';


const Option = Select.Option;

async function loadData(props) {
    try {
        const pathname = props.location.pathname;
        if (pathname === '/') {
            const res = await axios.get('http://192.168.0.22:8000/api/auth/isLoggedIn');
            const { success } = res.data;
            if (success) {
                props.history.push('/project');
            } else {
                props.history.push('/login');
            }
        }

    } catch (e) {
        props.history.push('/login')
    }
}


class Root extends Component {
    handleOnChange(value) {
        console.log(value);
        this.props.localeActions.setContry(value);
    }

    componentDidMount() {
        loadData(this.props);
    }

    render() {
        return (
            <Fragment>
                    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 10 }}>
                    <Select defaultValue="en" style={{ width: 120 }}
                    onChange={this.handleOnChange.bind(this)} >
                    <Option value="en">English</Option>
                    <Option value="ko">한국어</Option>
                    <Option value="de">Deutsch</Option>
                    </Select>
                    </div>
                <Route path="/login" render={() => <InitialScreen {...this.props}/>} />
                <Route path="/join" render={() => <InitialScreen {...this.props}/>} />
                <Route path="/password" render={() => <InitialScreen {...this.props}/>} />
                <Route path="/main" render={() => <MainScreen {...this.props} />} />
                <Route path="/project" render={() => <ProjectSettingScreen {...this.props} />}/>
            </Fragment>
        );
    }
};

export default connect(
    (state) => ({
        locale: state.locale.text
    }),
    (dispatch) => ({
        localeActions: bindActionCreators(LocaleActions, dispatch)
    })
)(withRouter(windowSize(Root)));
