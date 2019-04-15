import React, {Component} from 'react';
import { Modal, Form, Input } from 'antd';


class EmailModal extends Component {
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Please enter the email address of the username you are looking for"
                okText="Submit"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email' }, {
                                type: 'email', message: 'The input is not valid email'
                            }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({ name: 'email_modal' })(EmailModal);
