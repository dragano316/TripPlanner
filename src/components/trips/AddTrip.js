import React, {Component} from "react";
import {Form, Button, Input} from 'antd';
import TripService from "../../services/TripService";
import {strings} from "../../constant/strings";
import {commentConfig} from "../../utils/formConfigs";
import {toast} from "react-toastify";
import DestinationComponent from "../tripform/DestinationComponent";
import DateRangeComponent from "../tripform/DateRangeComponent";

const {TextArea} = Input;


export const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    }
}

class AddTrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: ""
        };
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
        const [data, err] = await TripService.addTrip(values);
        if (err) {
            toast.error(strings.someThingWrong);
        } else {
            toast.success(strings.tripSuccessfullyAdded);
            this.props.history.push("/");
        }
    };

    onChangeText = e => {
        this.setState({comment: e.target.value})
    };

    render() {
        return (
            <div className="container">
                <div className="w-50 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">{strings.addTrip}</h2>
                    <Form name="time_related_controls" {...formItemLayout} onFinish={this.onFinish}>
                        <DestinationComponent/>
                        <DateRangeComponent/>
                        <Form.Item
                            name="comment"
                            {...commentConfig}
                            hasFeedback
                        >
                            <TextArea showCount minLength={10} maxLength={100} onChange={this.onChangeText}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {strings.addTrip}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );

    }

}

export default AddTrip;
