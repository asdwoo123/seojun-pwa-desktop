import React, {Component, Fragment} from 'react';
import { Typography, Form, Icon, Input, Button, Checkbox, message, Select } from 'antd';
import axios from 'axios';
import { EmailOutlined } from '@material-ui/icons';


const { Text } = Typography;
const { Item } = Form;
const Option = Select.Option;

class SignUpScreen extends Component {
    state = {
        confirmDirty: false,
        language: 'en'
    };

    handleSubmit = (e) => {
        const { push } = this.props.history;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.remember) {
                    axios.post('http://www.seojuneng.co.kr/api/auth/join', values)
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

    handleOnChange(value) {
        this.setState({
            languag: value
        });
    }

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
        const { windowWidth } = this.props;
        const buttonWidth = { width: (windowWidth >= 720) ? 170 : "calc(50% - 10px)" };
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
                            <Input prefix={<EmailOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 14 }} />} placeholder="Email"/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username' }]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username"/>
                        )}
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }]
                            }, {
                                validator: this.validateToNextPassword
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
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
                                <Input onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                            )
                        }
                    </Item>
                    <Item>
                        <div style={{ width: 'calc(100% - 160px)', display: "inline-block" }}>Language</div>
                        {
                            getFieldDecorator('language', {
                                initialValue: "en"
                            })(
                                    <Select style={{ width: 160 }}>
                                        <Option value="en">English</Option>
                                        <Option value="ko">한국어</Option>
                                        <Option value="de">Deutsch</Option>
                                    </Select>
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

                    <div className="formMargin" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button style={buttonWidth} type="primary" htmlType="submit">{join[2]}</Button>
                        <Button style={buttonWidth} onClick={() => push('/login')}>{join[3]}</Button>
                    </div>
                </Form>
            </Fragment>
        )
    }
}

export default Form.create({ name: 'sign up' })(SignUpScreen);
