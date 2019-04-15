import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Route } from 'react-router-dom';
import DashScreen from "./dashboard/DashScreen";
import CctvScreen from "./cctv/CctvScreen";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SocketActions from '../../redux/socketReducer';
import axios from 'axios';
import queryString from 'query-string';
import logo from './logo.svg';
import { Tabs, NavBar } from 'antd-mobile';



class MainScreen extends Component {
    state = {
        collapsed: false,
        name: '',
        rsps: []
    };

    async componentWillMount() {
       this.querying = this.props.location.search;
       const projectId = queryString.parse(this.querying).project;
       const res = await axios.get(`http://192.168.0.22:8000/api/project/projectOne/
       ${projectId}`);
       const { name, rsps } = res.data;
       this.setState({
           name,
           rsps
       });
       this.props.socketActions.setRsps(this.state.rsps);
    }

    handleLogout = () => {
        axios.get('http://192.168.0.22:8000/auth/logout')
            .then(res => {
               if (res.data.success === true) {
                   this.props.history.push("/login");
               }
            });
    };

    handleOnNav = (name) => () => {
        const { history } = this.props;
        history.push(`/${name}`);
    };

    render() {
        const { main } = this.props.locale;
        const { windowWidth } = this.props;
        if (windowWidth >= 720) {
            return (
                <div className="bg" style={{ width: '100%', height: '100%', backgroundColor: '#0e1839' }}>
                    <div style={{ width: 260, height: '100%', float: "left" }}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            theme="dark"
                        >
                            <p style={{ height: 64, lineHeight: 4, color: '#7c85a1', paddingLeft: 16,
                                fontSize: 15, cursor: "pointer", marginBottom: 0, backgroundColor: 'white',
                                display: 'flex', alignItems: 'center', opacity: 0.85 }} onClick={() => this.props.history.push("/project")}>
                                <img width={70} src={logo} />
                                <span style={{ display: 'inline-block', marginLeft: 15, fontSize: 18 }}>
                            SEOJUN ENG</span></p>
                            <Menu.Item onClick={this.handleOnNav(`main${this.querying}`)} key="1">
                                <Icon type="dashboard" />
                                <span>{main[3]}</span>
                            </Menu.Item>
                            <Menu.Item onClick={this.handleOnNav(`main/cctv${this.querying}`)} key="2">
                                <Icon type="video-camera" />
                                <span>{main[4]}</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <AppBar style={{ width: 'calc(100% - 260px)', marginLeft: 260, background: 'linear-gradient(90deg, rgba(35,45,91,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' }} position="static" color="default">
                        <Toolbar>
                            <Typography style={{ flexGrow: 1, color: 'rgb(131, 144, 167)' }} variant="h6" color="inherit">
                                {main[0]}: {this.state.name}
                            </Typography>
                            <Button style={{ color: 'rgb(131, 144, 167)' }} onClick={() => this.props.history.push("/project")}>{main[1]}</Button>
                            <Button style={{ color: 'rgb(131, 144, 167)' }} onClick={this.handleLogout}>{main[2]}</Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{ float: 'left', margin: 50 }}>
                        <Route exact path="/main" render={() => <DashScreen {...this.props} />}/>
                        <Route path="/main/cctv" render={() => <CctvScreen {...this.props} />}/>
                    </div>
                    <div style={{ clear: "both" }} />
                </div>
            );
        } else {
            const tabs = [
                { title: main[3] },
                { title: main[4] }
            ];
            return (
              <div>
                  <NavBar mode="dark"
                          leftContent={[
                              <span onClick={() => this.props.history.push("/project")}>{main[1]}</span>
                          ]}
                          rightContent={[
                              <span onClick={this.handleLogout}>{main[2]}</span>
                          ]}
                  >
                      {this.state.name}
                  </NavBar>
                  <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                      <DashScreen {...this.props} />
                      <CctvScreen {...this.props}/>
                  </Tabs>
              </div>
            );
        }
    }
}


export default connect(
    (state) => ({
        project: state.project,
        rsps: state.socket.rsps
    }),
    (dispatch) => ({
        socketActions: bindActionCreators(SocketActions, dispatch)
    })
)(MainScreen);

