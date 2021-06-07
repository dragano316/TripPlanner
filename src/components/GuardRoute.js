import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import {LocalStorage} from "../localstorage/LocalStorage";
import {strings} from "../constant/strings";

class GuardRoute extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {component:Component,allowed,...rest} = this.props;
        return (
                <Route {...rest} render={(props) => (
                    (LocalStorage.getItem(strings.jwttoken)&& (allowed?true:LocalStorage.getItem(strings.role)!=='regular'))
                        ? <Component {...props} />
                        : <Redirect to='/' />
                )} />
                )
    }
}

GuardRoute.propTypes = {};

export default GuardRoute;
