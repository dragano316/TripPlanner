import React, {Component} from "react";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";

import {strings} from "../../constant/strings";
import {toast} from "react-toastify";
import {Routes} from "../../constant/Routes";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            role: ""
        };
    }

    async componentDidMount() {

        const [data, err] = await UserService.viewUser(this.props.match.params.id);
        if (err) {
            toast.error(err[1]);
            this.props.history.push('/users');
        } else {
            this.setState({email: data.email, name: data.name, role: data.role});
        }
    }

    render() {
        return (
            <div className="container py-4">
                <Link className="btn btn-primary" to={Routes.home}>
                    {strings.back}
                </Link>
                <h1 className="display-4">{strings.userId} {this.props.match.params.id}</h1>
                <hr/>
                <ul className="list-group w-50">
                    <li className="list-group-item">{strings.name}: {this.state.name}</li>
                    <li className="list-group-item">{strings.email}: {this.state.email}</li>
                    <li className="list-group-item">{strings.role[0].toUpperCase() + strings.role.slice(1)}: {this.state.role}</li>
                </ul>
            </div>
        );

    }

}

export default User;
