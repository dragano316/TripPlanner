import React, {Component} from 'react';
import {DatePicker, Form} from "antd";
const {RangePicker} = DatePicker;

class DateRangeComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: 'date is required!',
                    }
                ]}
                name="range_picker" label="Date(Start-End)" hasFeedback>
                <RangePicker/>
            </Form.Item>
        );
    }
}

DateRangeComponent.propTypes = {};

export default DateRangeComponent;
