import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {strings} from "../../constant/strings";
import styles from '../../css/Action.module.css';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state={
            initLoading: true,
            loading: false,
        }
    }



    render() {
        const {user,index,deleteUser} = this.props;
        return (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>
                        {strings.view}
                    </Link>
                    {
                        window.localStorage.getItem('role')==='manager'?(
                            (user.role==='admin' || user.role==='manager')?null:                                <Link
                                className={`btn btn-outline-primary mr-2 ${styles.action}`}
                                to={`/users/edit/${user.id}`}
                            >
                                {strings.edit}
                            </Link>
                        ):                                <Link
                            className={`btn btn-outline-primary mr-2 ${styles.action}`}
                            to={`/users/edit/${user.id}`}
                        >
                            {strings.edit}
                        </Link>
                    }
                    {
                        window.localStorage.getItem('role')==='manager'?(
                                (user.role==='regular')?(
                                    <Link
                                        to={'/users/'}
                                        className={`btn btn-danger ${styles.action}`}
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        {strings.delete}
                                    </Link>
                                ):null):
                            <Link
                                to={'/users/'}
                                className="btn btn-danger"
                                onClick={() => deleteUser(user.id)}
                            >
                                {strings.delete}
                            </Link>
                    }

                </td>
            </tr>
        );
    }
}

UserList.propTypes = {};

export default UserList;
