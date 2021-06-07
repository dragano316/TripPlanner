import React, {Component} from "react";
import {Button, Form} from "antd";
import {strings} from "../../constant/strings";
import UserService from "../../services/UserService";
import {toast} from "react-toastify";
import NameComponent from "../userform/NameComponent";
import EmailComponent from "../userform/EmailComponent";
import CascaderComponent from "../userform/CascaderComponent";

class EditUser extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        const [data, err] = await UserService.viewUser(this.props.match.params.id);
        if (err) {
            toast.error(err[1]);
            this.props.history.push('/users');
        } else {
            console.log(data.role);
            this.formRef.current.setFieldsValue({
                name: data.name,
                email: data.email,
                role: [data.role]
            })
        }
    }


    onFinish = async (fieldsValue) => {
        // Should format date value before submit.
        const values = {
            'email': fieldsValue['email'],
            'name': fieldsValue['name'],
            'role': fieldsValue['role'] ? fieldsValue['role'][0] : 'regular'
        };
        console.log(values);
        const [data, err] = await UserService.updateUser(this.props.match.params.id, values);
        if (err) {
            toast.error(strings.somethingWentWrong);
        } else {
            toast.success(strings.userUpdated);
            this.props.history.push("/");
        }
    };


    render() {
        return (

            <div className="container">
                <div className="w-50 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">{strings.editUser}</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={this.onFinish}
                    >
                        <NameComponent/>
                        <EmailComponent/>
                        <CascaderComponent/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.editUser}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );

    }

}

export default EditUser;
