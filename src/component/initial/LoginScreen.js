import React, { Component ,Fragment } from 'react';
import { Typography, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Toast } from 'antd-mobile';
import axios from 'axios';
import EmailModal from "./EmailModal";

const { Text } = Typography;
const { Item } = Form;

class LoginScreen extends Component {
    state = {
      visible: false
    };

    handlePost = () => {
        const form = this.formRef.props.form;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const res = await axios.post("http://192.168.0.22:8000/api/auth/findUsername", values);
            if (res.data.success) {
                form.resetFields();
                this.setState({ visible: false });
                this.handleCancel();
                Toast.info('귀하의 이메일로 아이디가 발송되었습니다.', 2);
            } else {
                Toast.info('이메일 주소에 해당하는 아이디가 존재하지 않습니다.', 2);
            }
        });
    };

    showModal = () => {
        this.setState({ visible: true })
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    emailFormRef = (formRef) => {
        this.formRef = formRef;
    };

    handleSubmit = (e) => {
        const { push } = this.props.history;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('http://192.168.0.22:8000/api/auth/login', values)
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            push('/project');
                        } else {
                            message.error(res.data.message);
                        }
                    }).catch(e => console.log(e));
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { push } = this.props.history;
        const { login } = this.props.locale;
        return (
            <Fragment>
                <Text style={{ fontSize: 17, marginBottom: 25 }} type="secondary">{login[0]}</Text>
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
                                <Checkbox>{login[1]}</Checkbox>
                            )
                        }
                    </Item>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button style={{ width: 170 }} type="primary" htmlType="submit">{login[2]}</Button>
                    <Button style={{ width: 170 }} onClick={() => push('/join')}>{login[3]}</Button>
                    </div>
                    <p style={{ marginTop: 10, display: "flex", justifyContent: 'space-between' }}>
                        <a onClick={event => {
                            event.preventDefault();
                            this.showModal();
                        }}>Forgot username</a>
                        {/*<a onClick={event => {
                            event.preventDefault();
                            push("/password");
                        }}>Change password</a>*/}
                    </p>
                </Form>
                <EmailModal
                    wrappedComponentRef={this.emailFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handlePost}
                />
            </Fragment>
        )
    }
}

export default Form.create({ name: 'login' })(LoginScreen);
