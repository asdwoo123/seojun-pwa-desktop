import React, { Component, Fragment } from 'react';
import { Table, Divider } from 'antd';
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SocketActions from '../../../redux/socketReducer';
import { List, Toast } from 'antd-mobile';
import LongPress from 'react-long';


const Item = List.Item;

class ProjectList extends Component {
    state = {
        visible: false,
        visible2: false,
        data: [],
        deid: 0
    };

    loadData = async () => {
        const res = await axios.get('http://www.seojuneng.co.kr/api/project/projectAll', {
            withCredentials: true
        });
        const data = res.data;
        const kd = [];
        data.forEach((item, index) => {
            const { id, name, description, createdAt, updatedAt } = item;
            kd.push({
                id,
                name,
                description,
                createdAt: createdAt.substr(0, 10),
                updatedAt: updatedAt.substr(0, 10)
            });
        });
        this.props.socketActions.setProjectList(kd);
    };

    componentDidMount() {
        this.loadData();
    }

    renderFun = (text, record, index) => {
        if (index % 2 === 0) {
            return (<span style={{ backgroundColor: '#232d5b', color: '#7c85a1',
                width: '100%', height: '100%', padding: 16, display: "block",
           }}>
                        {text}
                    </span>)
        } else {
            return (<span style={{ backgroundColor: '#18244c', color: '#7c85a1', width: '100%',
                height: '100%', padding: 16, display: "block",
            }}>
                        {text}
                    </span>)
        }};



    showModal = () => {
        this.setState({ visible: true })
    };

    showModal2 = () => {
        this.setState({ visible2: true })
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCancel2 = () => {
        this.setState({ visible2: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    handleDeleted = () => {
        const form = this.formRef2.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            axios.post(`http://www.seojuneng.co.kr/api/project/projectOne/${this.state.deid}`, values)
                .then((res) => {
                    this.loadData();
                    if (res.data.success) {
                        Toast.info("삭제되었습니다.",1);
                    } else {
                        Toast.info("비밀번호가 일치하지 않습니다.",1);
                    }
                });
            form.resetFields();
            this.setState({ visible2: false });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    deletedFormRef = (formRef) => {
      this.formRef2 = formRef;
    };

    render() {
        const { project } = this.props;
        const columns = [{
            title: project[1],
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
                if (index % 2 === 0) {
                    return (<span style={{ backgroundColor: '#232d5b', color: '#7c85a1',
                        width: '100%', height: '100%', padding: 16, display: "block",
                    }}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push(`/main?project=${index+1}`)
                        }}>{text}</a></span>)
                } else {
                    return (<span style={{ backgroundColor: '#18244c', color: '#7c85a1', width: '100%',
                        height: '100%', padding: 16, display: "block",
                    }}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push(`/main?project=${index+1}`)
                        }}>{text}</a>
                    </span>)
                }
            }
        }, {
            title: project[2],
            dataIndex: 'description',
            key: 'description',
            render: this.renderFun
        }, {
            title: project[3],
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: this.renderFun
        }, {
            title: project[4],
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: this.renderFun
        }, {
            title: '',
            key: 'action',
            render: (text, record, index) => {
            if (index % 2 === 0) {
                return (
                    <span style={{ backgroundColor: '#232d5b', color: '#7c85a1',
                        width: '100%', height: '100%', padding: 16, display: "block" }}>
                   <a style={{ color: 'rgb(221, 146, 8)' }} onClick={(e) => {
                    e.preventDefault();
                    console.log(record);
                    this.setState({
                        deid: record.id
                    });
                    this.showModal2();
                }}>{project[6]}</a>
                    </span>
                )
            } else {
                return (<span style={{ backgroundColor: '#18244c', color: '#7c85a1', width: '100%',
                    height: '100%', padding: 16, display: "block" }}>
                        <a style={{ color: 'rgb(221, 146, 8)' }} onClick={(e) => {
                            e.preventDefault();
                            this.showModal();
                        }}>{project[5]}</a>
                    <Divider type="vertical" />
                <a style={{ color: 'rgb(221, 146, 8)' }} onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                        deid: index + 1
                    });
                    this.showModal2();
                }}>{project[6]}</a>
                    </span>)
            }}
        }];

        const { windowWidth } = this.props;
        if (windowWidth >= 720) {
            return (
                <Fragment>
                    <Table style={{ marginRight: 30 }} columns={columns}
                           dataSource={this.props.projects} />
                    <FormModal
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                    <DeleteModal
                        wrappedComponentRef={this.deletedFormRef}
                        visible={this.state.visible2}
                        onCancel={this.handleCancel2}
                        onCreate={this.handleDeleted}
                        deleted={this.state.deid}
                    />
                </Fragment>
            )
        } else {
            console.log(windowWidth);
            return (
                <List style={{ marginTop: 20 }}>
                    {
                        this.props.projects.map((item, index) => (
                            <LongPress
                                key={index}
                                onPress={() => this.props.history.push(`/main?project=${index+1}`)}
                                onLongPress={(e) => {
                                    this.setState({
                                        deid: item.id
                                    });
                                    this.showModal2();
                                }}>
                            <Item
                                extra={item.description} >
                                {item.name}
                            </Item>
                            </LongPress>
                        ))
                    }
                    <DeleteModal
                        wrappedComponentRef={this.deletedFormRef}
                        visible={this.state.visible2}
                        onCancel={this.handleCancel2}
                        onCreate={this.handleDeleted}
                        deleted={this.state.deid}
                    />
                </List>
            )
        }
    }
};

export default connect(
    (state) => ({
        projects: state.socket.projects
    }),
    (dispatch) => ({
        socketActions: bindActionCreators(SocketActions, dispatch)
    })
)(withRouter(ProjectList));
