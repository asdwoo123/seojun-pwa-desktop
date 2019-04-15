import React, { Component, Fragment } from 'react';
import { Table, Card } from 'antd';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import queryString from "query-string";
import axios from "axios";


const renderFun = (text, record, index) => {
    const commons = {
        color: '#7c85a1',
        width: '100%',
        height: '100%',
        padding: 16,
        display: "block"
    };

    if (index % 2 === 0) {
        return (<span style={{ backgroundColor: '#232d5b', ...commons}}>
                        {text}
                    </span>)
    } else {
        return (<span style={{ backgroundColor: '#18244c', ...commons }}>
                        {text}
                    </span>)
    }
};



class DashScreen extends Component {
    state = {
        plcdatas: []
    };

    async componentDidMount() {
        this.querying = this.props.location.search;
        const projectId = queryString.parse(this.querying).project;
        const res = await axios.get(`http://192.168.0.22:8000/api/project/projectOne/
       ${projectId}`);
        const { rsps } = res.data;
        rsps.forEach((rsp, index) => {
            const plcdata = {};
            plcdata.name = rsp.name;
            plcdata.key = (index + 1).toString();
            const socket = io(`http://${rsp.ip}`, {
                path: '/socket.io'
            });
            plcdata.socket = socket;

            socket.on('Total', (data) => {
               plcdata.total = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('Cycle time', (data) => {
               plcdata.cycleTime = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('Part number', (data) => {
                plcdata.partnumber = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('OK', (data) => {
                plcdata.ok = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('NOK', (data) => {
                plcdata.nok = data.value;
                this.updateData(plcdata, index);
            });
        });
    }

    componentWillUnmount() {
        this.state.plcdatas.forEach((item, index) => {
           item.socket.disconnect();
        });
    }

    updateData = (plcdata, index) => {
        const plcdatas = this.state.plcdatas;
        plcdatas[index] = plcdata;
        this.setState({
            plcdatas
        });
    };

    render() {
        const { dashboard } = this.props.locale;
        const { windowWidth } = this.props;
        const dataSource = [{
            key: '1',
            name: 'Hyebin',
            partnumber: 'test1',
            cycleTime: 10,
            total: 25,
            ok: 5,
            nok: 10
        },{
            key: '2',
            name: 'Yeonwoo',
            partnumber: 'test2',
            cycleTime: 10,
            total: 30,
            ok: 25,
            nok: 5
        },{
            key: '3',
            name: 'Jane',
            partnumber: 'test3',
            cycleTime: 10,
            total: 50,
            ok: 30,
            nok: 20
        },{
            key: '4',
            name: 'Nayun',
            partnumber: 'test4',
            cycleTime: 10,
            total: 40,
            ok: 35,
            nok: 5
        },{
            key: '5',
            name: 'Taeha',
            partnumber: 'test5',
            cycleTime: 10,
            total: 42,
            ok: 40,
            nok: 2
        }];

        const columns = [{
            title: dashboard[0],
            dataIndex: 'name',
            key: 'name',
            render: renderFun
        }, {
            title: dashboard[1],
            dataIndex: 'partnumber',
            key: 'partnumber',
            render: renderFun
        }, {
            title: dashboard[2],
            dataIndex: 'cycleTime',
            key: 'cycletime',
            render: renderFun
        }, {
            title: dashboard[3],
            dataIndex: 'total',
            key: 'total',
            render: renderFun
        }, {
            title: dashboard[4],
            dataIndex: 'ok',
            key: 'ok',
            render: renderFun
        }, {
            title: dashboard[5],
            dataIndex: 'nok',
            key: 'nok',
            render: renderFun
        }];
        const pStyle = { paddingLeft: 20, paddingRight: 20, display: 'flex',
            justifyContent: 'space-between' };
        return (
            <div>
                {
                    (windowWidth >= 720) ? <Table style={{ width: 700 }} dataSource={this.state.plcdatas} columns={columns} /> :
                        <Fragment>
                            <Card style={{ borderBottom: '1px solid #333' }} title={dashboard[1]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}><span> {item.name}</span>
                                            <span>{item.total}</span>   </p>
                                    ))
                                }
                            </Card>
                            <Card title={dashboard[2]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}><span> {item.name}</span>
                                            <span>{item.total}</span>   </p>
                                    ))
                                }
                            </Card>
                            <Card title={dashboard[3]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}>
                                            <span> {item.name}</span>
                                            <span>{item.total}</span>
                                           </p>
                                    ))
                                }
                            </Card>
                            <Card title={dashboard[4]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}>
                                            <span>{item.name}</span>
                                            <span>{item.nok}</span>
                                        </p>
                                    ))
                                }
                            </Card>
                            <Card title={dashboard[5]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}>
                                            <span>{item.name}</span>
                                            <span>{item.nok}</span>
                                            </p>
                                    ))
                                }
                            </Card>
                        </Fragment>
                }
            </div>
        )
    }
};

export default connect(
)(DashScreen);
