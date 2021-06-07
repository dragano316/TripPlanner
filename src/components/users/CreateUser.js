import React, {Component} from 'react';
import {Form,Button} from 'antd';
import {strings} from "../../constant/strings";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import NameComponent from "../userform/NameComponent";
import EmailComponent from "../userform/EmailComponent";
import PasswordComponent from "../userform/PasswordComponent";
import CascaderComponent from "../userform/CascaderComponent";


class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'regular',
        }
    }


    onFinish = async (fieldsValue) => {
        const values = {
            'email': fieldsValue['email'],
            'name': fieldsValue['name'],
            'role': fieldsValue['role'][0],
            'password': fieldsValue['password']
        };
        const [data, err] = await UserService.createUser(values);
        if (err) {
            // console.log(err);
            toast.error(err[1]);
        } else {
            toast.success(strings.userSuccessfullyAdded);
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <div className="container">
                <div className="w-50 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">{strings.addUser}</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <NameComponent/>
                        <EmailComponent/>
                        <CascaderComponent/>
                        <PasswordComponent/>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.createUser}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}


export default CreateUser;
