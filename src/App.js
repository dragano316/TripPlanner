import React, {Component} from 'react';
import Header from "./components/Header";
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddTrip from "./components/trips/AddTrip";
import EditTrip from "./components/trips/EditTrip";
import Trip from "./components/trips/Trip";
import Users from "./components/users/Users";
import User from "./components/users/User";
import EditUser from "./components/users/EditUser";
import CreateUser from "./components/users/CreateUser";
import {AxiosUtil} from "./utils/AxiosUtil";
import NoMatchPage from "./components/NoMatchPage";
import GuardRoute from "./components/GuardRoute";
import {Routes} from "./constant/Routes";
import {ToastContainer} from "react-toastify";


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AxiosUtil.initAxios();
    }

    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path={Routes.home} component={Home}/>
                    <Route exact path={Routes.signUp} component={Signup}/>
                    <Route exact path={Routes.login} component={Login}/>
                    <GuardRoute exact path={Routes.addTrip} component={AddTrip} allowed={true}/>
                    <GuardRoute exact path={Routes.editTrip} component={EditTrip} allowed={true}/>
                    <GuardRoute exact path={Routes.viewTrip} component={Trip} allowed={true}/>
                    <GuardRoute exact path={Routes.users} component={Users}/>
                    <GuardRoute exact path={Routes.editUser} component={EditUser}/>
                    <GuardRoute exact path={Routes.viewUser} component={User}/>
                    <GuardRoute exact path={Routes.createUser} component={CreateUser}/>
                    <Route path='*' component={NoMatchPage}/>
                </Switch>
                <ToastContainer/>
            </>
        );

    }
}


export default App;
