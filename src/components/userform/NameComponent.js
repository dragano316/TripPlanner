import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from "antd";
import {nameConfig} from "../../utils/formConfigs";
import {UserOutlined} from "@ant-design/icons";

class NameComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form.Item
                name="name"
                {...nameConfig}
                hasFeedback
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Name"
                    // onChange={ this.setName } value={ this.state.name}
                />
            </Form.Item>
        );
    }
}

NameComponent.propTypes = {};

export default NameComponent;
