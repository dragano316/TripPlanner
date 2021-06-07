import React, {Component} from 'react';
import {Form, Input} from "antd";
import {passwordConfig} from "../../utils/formConfigs";
import {LockOutlined} from "@ant-design/icons";

class PasswordComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form.Item
                name="password"
                {...passwordConfig}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                    // onChange={ this.setPassword } value={ this.state.password}
                />
            </Form.Item>
        );
    }
}

PasswordComponent.propTypes = {};

export default PasswordComponent;
