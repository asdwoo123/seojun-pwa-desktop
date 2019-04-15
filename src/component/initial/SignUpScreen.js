import React, {Component, Fragment} from 'react';
import { Typography, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { EmailOutlined } from '@material-ui/icons';


const { Text } = Typography;
const { Item } = Form;


class SignUpScreen extends Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = (e) => {
        const { push } = this.props.history;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.remember) {
                    axios.post('http://192.168.0.22/api/auth/join', values)
                        .then(res => {
                           if (res.data.success) {
                               push('/login');
                           } else {
                               message.error(res.data.message);
                           }
                        });
                } else {
                    message.error('Agreement is required');
                }
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { push } = this.props.history;
        const { join } = this.props.locale;
        return (
            <Fragment>
                <Text style={{ fontSize: 17, marginBottom: 25 }} type="secondary">{join[0]}</Text>
                <Form onSubmit={this.handleSubmit}>
                    <Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email' }, {
                                type: 'email', message: 'The input is not valid email'
                            }]
                        })(
                            <Input style={{ width: 350 }} prefix={<EmailOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 14 }} />} placeholder="Email"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username' }]
                        })(
                            <Input style={{ width: 350 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"/>
                        )}
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }]
                            }, {
                                validator: this.validateToNextPassword
                            })(
                                <Input style={{ width: 350 }} type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('confirm', {
                                rules: [{ required: true, message: 'please confirm your password' }]
                            }, {
                                validator: this.compareToFirstPassword
                            })(
                                <Input style={{ width: 350 }} onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(
                                <Checkbox>{join[1]}</Checkbox>
                            )
                        }
                    </Item>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button style={{ width: 170 }} type="primary" htmlType="submit">{join[2]}</Button>
                        <Button style={{ width: 170 }} onClick={() => push('/login')}>{join[3]}</Button>
                    </div>
                </Form>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'sign up' })(SignUpScreen);
