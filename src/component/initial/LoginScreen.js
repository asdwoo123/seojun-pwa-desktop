import React, { Component ,Fragment } from 'react';
import { Typography, Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';


const { Text } = Typography;
const { Item } = Form;

class LoginScreen extends Component {
    handleSubmit = (e) => {
        const { push } = this.props.history;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://192.168.0.22:8000/auth/login', values)
                    .then(res => {
                        console.log(res);
                        if (res.status === 201) {
                            push('/main');
                        }
                    }).catch(e => console.log(e));
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { push } = this.props.history;
        return (
            <Fragment>
                <Text style={{ fontSize: 17, marginBottom: 25 }} type="secondary">Please login to your account</Text>
                <Form onSubmit={this.handleSubmit}>
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username' }]
                        })(
                            <Input style={{ width: 350 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>
                        )}
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }]
                            })(
                                <Input style={{ width: 350 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )
                        }
                    </Item>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button style={{ width: 170 }} type="primary" htmlType="submit">Login</Button>
                    <Button style={{ width: 170 }} onClick={() => push('/join')}>Sign up</Button>
                    </div>
                </Form>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'login' })(LoginScreen);
