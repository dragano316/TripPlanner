import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {LocalStorage} from "../localstorage/LocalStorage";
import {strings} from "../constant/strings";
import UserService from "../services/UserService";
import {emailConfig, nameConfig, passwordConfig} from "../utils/formConfigs";
import {toast} from "react-toastify";
import EmailComponent from "./userform/EmailComponent";
import PasswordComponent from "./userform/PasswordComponent";
import NameComponent from "./userform/NameComponent";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'regular'
        }
    }

    onFinish = async (values) => {
        const {email, password, name} = values;
        console.log(email, password, name);
        const [res, err] = await UserService.signUp(email, password, this.state.role, name);
        if (err) {
            toast.error(err[1]);
        } else {
            LocalStorage.setItem(strings.jwttoken, res.jwtToken);
            LocalStorage.setItem(strings.id, res.id);
            LocalStorage.setItem(strings.role, res.role);
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <div className="container">
                <div className="w-50 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">{strings.signup}</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        {/*how config is done*/}
                        <NameComponent/>
                        <EmailComponent/>
                        <Form.Item
                            name="role"
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon"/>} disabled
                                   placeholder="Regular User"/>
                        </Form.Item>
                        <PasswordComponent/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.register}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}

export default Signup;
