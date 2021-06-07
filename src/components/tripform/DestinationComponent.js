import React, {Component} from 'react';
import {Form, Input} from "antd";
import {destinationConfig} from "../../utils/formConfigs";
import {GlobalOutlined} from "@ant-design/icons";

class DestinationComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form.Item
                name="destination"
                {...destinationConfig}
                hasFeedback
            >
                <Input prefix={<GlobalOutlined className="site-form-item-icon"/>}
                       placeholder="Destination"/>
            </Form.Item>
        );
    }
}

DestinationComponent.propTypes = {};

export default DestinationComponent;
