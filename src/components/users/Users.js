import React, {Component} from 'react';
import {strings} from "../../constant/strings";
import UserService from "../../services/UserService";
import UserList from "./UserList";
import {Button} from "antd";
import {toast} from "react-toastify";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    // async getData(page){
    //     const [res, err] = await UserService.getAllUsers(page,this.state.page);
    //     if (err) {
    //         alert('error');
    //     } else {
    //         this.setState({data:res,page:page?page-1:1});
    //     }
    // }

    async getData() {
        const [data, err] = await UserService.getAllUsers(this.state.page);
        if (err) {
            toast.error(strings.somethingWentWrong);
        } else {
            if (data.length === 0) {
                toast.error(strings.noData);
            }
            this.setState({data: this.state.data.concat(data), page: this.state.page + 1});
        }
    }

    deleteUser = async id => {

        const [data, err] = await UserService.deleteUser(id);
        if (err) {
            toast.error(strings.somethingWentWrong);
        } else {
            toast.success(strings.userDeleted);
            const [res, err] = await UserService.getAllUsers(0, 0);
            if (err) {
                toast.error(strings.somethingWentWrong);
            } else {
                this.setState({data: res});
            }
        }
    };


    render() {
        return (
            <div className="container">
                <table className="table border shadow">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">{strings.hash}</th>
                        <th scope="col">{strings.name}</th>
                        <th scope="col">{strings.email[0].toUpperCase() + strings.email.slice(1)}</th>
                        <th scope="col">{strings.role[0].toUpperCase() + strings.role.slice(1)}</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((user, index) => (
                        <UserList user={user} index={index} key={index} deleteUser={this.deleteUser}/>
                    ))}
                    </tbody>
                </table>
                <Button onClick={this.getData}>{strings.loadMore}</Button>
                {/*<Pagination defaultCurrent={1} total={50} onChange={this.getData}/>*/}
            </div>
        );
    }
}


export default Users;
