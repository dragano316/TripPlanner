import React, {Component} from 'react';
import {emailConfig} from "../../utils/formConfigs";
import {Form, Input} from "antd";
import {MailOutlined} from "@ant-design/icons";

class EmailComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form.Item
                name="email"
                {...emailConfig}
                hasFeedback
            >
                <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"
                    // onChange={ this.setEmail } value={ this.state.email}
                />
            </Form.Item>
        );
    }
}

EmailComponent.propTypes = {};

export default EmailComponent;
