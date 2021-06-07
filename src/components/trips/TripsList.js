import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {strings} from "../../constant/strings";
import styles from '../../css/Action.module.css'

class TripsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user,index,deleteTrip} = this.props;
        const today = new Date();
        const userDate = new Date(user.startDate);
        const currYear = today.getFullYear();
        const currMonth = today.getMonth()+1;
        const currDay = today.getDate();
        const tripYear = userDate.getFullYear();
        const tripMonth = userDate.getMonth()+1;
        const tripDay = userDate.getDate();
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(tripYear,tripMonth,tripDay);
        const curr = new Date(currYear,currMonth,currDay)
        const diffDays = Math.round((firstDate - curr) / oneDay);
        return (
            <tr key={this.props.index}>
                <th scope="row">{index + 1}</th>
                <td>{user.destination}</td>
                <td>{user.startDate}</td>
                <td>{user.endDate}</td>
                <td>{user.comment}</td>
                <td>{diffDays>0?diffDays:0}</td>
                <td>
                    <Link className={`btn btn-primary mr-2 ${styles.action}`} to={`/trip/${user.id}`}>
                        {strings.view}
                    </Link>
                    <Link
                        className={`btn btn-outline-primary mr-2 ${styles.action}`}
                        to={`/trip/edit/${user.id}`}
                    >
                        {strings.edit}
                    </Link>
                    <Link to={'/'}
                          className={`btn btn-danger ${styles.action}`}
                          onClick={() => deleteTrip(user.id)}
                    >
                        {strings.delete}
                    </Link>
                </td>
            </tr>
        );
    }
}

TripsList.propTypes = {};

export default TripsList;
