import React, {Component} from 'react';
import {roleConfig} from "../../utils/formConfigs";
import {Cascader, Form} from "antd";
import {LocalStorage} from "../../localstorage/LocalStorage";
import {strings} from "../../constant/strings";

class CascaderComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form.Item name={"role"} {...roleConfig} hasFeedback
            >
                <Cascader
                    options={[
                        {
                            value: 'regular',
                            label: 'Regular'
                        },
                        {
                            value: 'manager',
                            label: 'Manager',
                            disabled: LocalStorage.getItem(strings.role) !== 'admin'
                        },
                        {
                            value: 'admin',
                            label: 'Admin',
                            disabled: LocalStorage.getItem(strings.role) !== 'admin'
                        }
                    ]}
                    placeholder={"Please Select Role"}
                    // onChange={this.setRole}
                    // prefix={<MailOutlined className="site-form-item-icon" />}
                    // prefix={<SelectOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
        );
    }
}

CascaderComponent.propTypes = {};

export default CascaderComponent;
