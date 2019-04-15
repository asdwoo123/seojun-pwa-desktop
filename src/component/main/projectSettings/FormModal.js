import React, {Component} from 'react';
import { Modal, Form, Input } from 'antd';


class FormModal extends Component {
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Please correct the project"
                okText="Modified"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="Project name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input project name' }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({ name: 'form_modal' })(FormModal);
