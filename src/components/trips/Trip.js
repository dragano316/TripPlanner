import React, {Component} from "react";
import {Link} from "react-router-dom";
import TripService from "../../services/TripService";
import {strings} from "../../constant/strings";
import {GenUtils} from "../../utils/GenUtils";
import {Routes} from "../../constant/Routes";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: "",
            startDate: "",
            endDate: "",
            comment: ""
        };
    }

    async componentDidMount() {
        const [res, err] = await TripService.viewTrip(this.props.match.params.id);
        if (err) {
            GenUtils.permissionCheck(err, this.props);
        } else {
            this.setState({
                destination: res.destination,
                comment: res.comment,
                startDate: res.startDate,
                endDate: res.endDate
            });
        }
    }

    render() {
        return (
            <div className="container py-4">
                <Link className="btn btn-primary" to={Routes.home}>
                    {strings.back}
                </Link>
                <h1 className="display-4">{strings.tripId} {this.props.match.params.id}</h1>
                <hr/>
                <ul className="list-group w-50">
                    <li className="list-group-item">{strings.destination}: {this.state.destination}</li>
                    <li className="list-group-item">{strings.startDate}: {this.state.startDate}</li>
                    <li className="list-group-item">{strings.endDate}: {this.state.endDate}</li>
                    <li className="list-group-item">{strings.comment}: {this.state.comment}</li>
                </ul>
            </div>
        );

    }

}

export default Trip;
