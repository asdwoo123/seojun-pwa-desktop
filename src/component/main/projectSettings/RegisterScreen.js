import React, {Component, Fragment} from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import * as SocketActions from '../../../redux/socketReducer';
import windowSize from 'react-window-size';


class RegisterScreen extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
           if (!err) {
               values.equipments = values.equipments.filter((n) => {
                  return n.name !== undefined;
               });
               await axios.post('http://www.seojuneng.co.kr/api/project/projectOne', values);
               this.props.form.resetFields();
               const res = await axios.get('http://www.seojuneng.co.kr/api/project/projectAll');
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
               message.success("등록되었습니다.");
           }
        });
    };

    handleSubmit2 = async (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                values.equipments = values.equipments.filter((n) => {
                    return n.name !== undefined;
                });
                await axios.post('http://www.seojuneng.co.kr/api/project/projectOne', values);
                this.props.form.resetFields();
                const res = await axios.get('http://www.seojuneng.co.kr/api/project/projectAll');
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
                Toast.info("등록되었습니다.",1);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { project, windowWidth } = this.props;
        getFieldDecorator('keys', { initialValue: [] });
        if (windowWidth >= 720) {
            return (
                <Card title={project[7]} style={{
                    background: 'url("/light-3362028.jpg") no-repeat 30% 30%', width: 500
                }}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div>
                            <Form.Item label={project[8]}>
                                {getFieldDecorator('name')(
                                    <Input placeholder={project[26]} />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('ip')(
                                    <Input placeholder={project[12]} />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label={project[9]}>
                                {getFieldDecorator('description')(<Input style={{ width: 370 }} />)}
                            </Form.Item>
                        </div>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8]
                                .map((item, index) => (
                                    <div key={index}>
                                        <Form.Item label={`${project[10]} ${item}`}>
                                            {getFieldDecorator(`equipments[${index}].name`)(<Input
                                                placeholder={project[11]}
                                            />)}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator(`equipments[${index}].port`)(<Input
                                                placeholder={project[27]}
                                            />)}
                                        </Form.Item>
                                    </div>
                                ))
                        }
                        <Form.Item style={{ marginLeft: 105 }}>
                            <Button style={{ marginBottom: 16 }} type="primary" htmlType="submit">{project[13]}</Button>
                        </Form.Item>
                    </Form>
                </Card>
            )
        } else {
            return (
                <Form style={{ position: "relative", top: 45 }} layout="inline" onSubmit={this.handleSubmit2}>
                    <div style={{ width: '95%', margin: 'auto' }}>
                        <p style={{ marginBottom: 0, fontSize: 12 }}>{project[8]}</p>
                        <Form.Item style={{ width: 'calc(50% - 6px)', marginRight: 12 }} >
                            {getFieldDecorator('name')(
                                <Input placeholder={project[26]} style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item style={{ width: 'calc(50% - 6px)', marginRight: 0 }} >
                            {getFieldDecorator('ip')(
                                <Input placeholder={project[12]} style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                    </div>
                    <div style={{ width: '95%', margin: 'auto' }}>
                        <p style={{ marginBottom: 0, fontSize: 12 }}>{project[9]}</p>
                        <Form.Item style={{ width: '100%' }} >
                            {getFieldDecorator('description')(<Input />)}
                        </Form.Item>
                    </div>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8]
                            .map((item, index) => (
                                <div key={index} style={{ width: '95%', margin: 'auto' }}>
                                    <p style={{ marginBottom: 0, fontSize: 12 }}>{`${project[10]} ${item}`}</p>
                                    <div style={{ display: 'flex' }}>
                                    <Form.Item style={{ width: 'calc(50% - 6px)', marginRight: 12 }} >
                                        {getFieldDecorator(`equipments[${index}].name`)(<Input
                                            placeholder={project[11]}
                                        />)}
                                    </Form.Item>
                                    <Form.Item style={{ width: 'calc(50% - 6px)', marginRight: 0 }}>
                                        {getFieldDecorator(`equipments[${index}].port`)(<Input
                                            placeholder={project[27]}
                                        />)}
                                    </Form.Item>
                                    </div>
                                </div>
                            ))
                    }
                    <div style={{ width: '95%', margin: 'auto', display: "flex", flexDirection: 'row-reverse' }}>
                    <Form.Item  style={{ marginRight: 0 }}>
                        <Button style={{ marginBottom: 16 }} type="primary" htmlType="submit">{project[13]}</Button>
                    </Form.Item>
                    </div>
                </Form>
            )
        }

    }
}

export default  connect(
    (state) => ({

    }),
    (dispatch) => ({
        socketActions: bindActionCreators(SocketActions, dispatch)
    })
)(Form.create({ name: 'register_form' })(windowSize(RegisterScreen)));
