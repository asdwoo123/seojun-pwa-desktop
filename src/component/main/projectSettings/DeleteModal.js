import React, {Component} from 'react';
import { Modal, Form, Input } from 'antd';


class DeleteModal extends Component {
    render() {
        const { visible, onCancel, onCreate, form, deleted } = this.props;
        const { getFieldDecorator } = form;
        console.log( deleted );
        return (
            <Modal
                visible={visible}
                title="Enter the user password to be deleted."
                okText="Deleted"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="Password">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password' }]
                        })(
                            <Input.Password />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({ name: 'delete_modal' })(DeleteModal);
