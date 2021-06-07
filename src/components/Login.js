import React, {Component} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {LocalStorage} from "../localstorage/LocalStorage";
import {strings} from "../constant/strings";
import UserService from "../services/UserService";
import {GenUtils} from "../utils/GenUtils";
import {emailConfig, passwordConfig} from "../utils/formConfigs";
import PasswordComponent from "./userform/PasswordComponent";
import EmailComponent from "./userform/EmailComponent";

class Login extends Component {
    constructor(props) {
        super(props);
    }


    onFinish = async (values) => {
        const {email, password} = values;
        const [res, err] = await UserService.login(email, password);
        if (err) {
            GenUtils.checkError(err)
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
                    <h2 className="text-center mb-4">{strings.login}</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <EmailComponent/>
                        <PasswordComponent/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.login}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}

Login.propTypes = {};

export default Login;
