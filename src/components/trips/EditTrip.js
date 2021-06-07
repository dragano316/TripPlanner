import React, {Component} from "react";
import {Button,Form} from "antd";
import {strings} from "../../constant/strings";
import TripService from "../../services/TripService";
import {GenUtils} from "../../utils/GenUtils";
import {formItemLayout} from "./AddTrip";
import moment from "moment";
import {toast} from "react-toastify";
import DestinationComponent from "../tripform/DestinationComponent";
import DateRangeComponent from "../tripform/DateRangeComponent";


class EditTrip extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
    }


    async componentDidMount() {

        const [res, err] = await TripService.viewTrip(this.props.match.params.id);
        if (err) {
            GenUtils.permissionCheck(err, this.props);
        } else {
            this.formRef.current.setFieldsValue({
                destination: res.destination,
                range_picker: [moment(res.startDate), moment(res.endDate)],
            })
        }
    }


    onFinish = async (fieldsValue) => {
        // Should format date value before submit.
        const rangeValue = fieldsValue['range_picker'];
        const values = {
            'destination': fieldsValue['destination'],
            'startDate': rangeValue[0].format('YYYY-MM-DD'),
            'endDate': rangeValue[1].format('YYYY-MM-DD'),
            'comment': fieldsValue['comment']
        };
        const [res, err] = await TripService.updateTrip(this.props.match.params.id, values);
        if (err) {
            toast.error(strings.someThingWrong);
        } else {
            toast.success(strings.tripUpdated);
            this.props.history.push("/");
        }

    };


    render() {
        return (
            <div className="container">
                <div className="w-50 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Edit Trip</h2>
                    <Form name="time_related_controls" {...formItemLayout} onFinish={this.onFinish} ref={this.formRef}>
                        <DestinationComponent/>
                        <DateRangeComponent/>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.editTrip}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );

    }

}

export default EditTrip;
