import React, { Component, Fragment } from 'react';
import { Table, Card, Collapse } from 'antd';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import queryString from "query-string";
import axios from "axios";


const Panel = Collapse.Panel;

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

    async componentWillMount() {
        this.querying = this.props.location.search;
        const projectId = queryString.parse(this.querying).project;
        console.log(projectId);
        const res = await axios.get(`http://www.seojuneng.co.kr/api/project/projectOne/
       ${projectId}`);
        console.log(res);
        const { rsps, connectIp } = res.data;
        rsps.forEach((rsp, index) => {
            const plcdata = {};
            plcdata.name = rsp.name;
            plcdata.key = (index + 1).toString();
            this.updateData(plcdata, index);
            const socket = io(`http://${connectIp}:${rsp.port}`, {
                path: '/socket.io'
            });
            plcdata.socket = socket;

            socket.on('Total', (data) => {
                console.log(data.value);
               plcdata.total = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('Cycle time', (data) => {
                console.log(data.value);
               plcdata.cycleTime = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('Part number', (data) => {
                console.log(data.value);
                plcdata.partnumber = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('OK', (data) => {
                console.log(data.value);
                plcdata.ok = data.value;
                this.updateData(plcdata, index);
            });

            socket.on('NOK', (data) => {
                console.log(data.value);
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
            <div style={{ height: '100%' }}>
                {
                    (windowWidth >= 720) ? <Table style={{ width: 700 }} dataSource={this.state.plcdatas} columns={columns} /> :
                        <Fragment>
                            <Collapse style={{ marginTop: 20 }}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        (item.partnumber) ?
                                        <Panel key={index} header={item.name} extra={<span>connect</span>}>
                                            <p style={pStyle}>
                                                <span>{dashboard[1]}</span>
                                                <span>{item.partnumber}</span>
                                            </p>
                                            <p style={pStyle}>
                                                <span>{dashboard[2]}</span>
                                                <span>{item.cycleTime}</span>
                                            </p>
                                            <p style={pStyle}>
                                                <span>{dashboard[3]}</span>
                                                <span>{item.total}</span>
                                            </p>
                                            <p style={pStyle}>
                                                <span>{dashboard[4]}</span>
                                                <span>{item.ok}</span>
                                            </p>
                                            <p style={pStyle}>
                                                <span>{dashboard[5]}</span>
                                                <span>{item.partnumber}</span>
                                            </p>
                                        </Panel> : <Panel key={index} header={item.name} disabled extra={<span>not connect</span>} />
                                    ))
                                }
                            </Collapse>
                            {/*<Card style={{ borderBottom: '1px solid #333' }} title={dashboard[1]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}><span> {item.name}</span>
                                            <span>{item.partnumber}</span>   </p>
                                    ))
                                }
                            </Card>
                            <Card title={dashboard[2]}>
                                {
                                    this.state.plcdatas.map((item, index) => (
                                        <p style={pStyle} key={index}><span> {item.name}</span>
                                            <span>{item.cycleTime}</span>   </p>
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
                                            <span>{item.ok}</span>
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
                            </Card>*/}
                        </Fragment>
                }
            </div>
        )
    }
};

export default connect(
)(DashScreen);
