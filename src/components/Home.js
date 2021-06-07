import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, Checkbox} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import {LocalStorage} from "../localstorage/LocalStorage";
import {strings} from '../constant/strings';
import TripService from "../services/TripService";
import TripsList from "./trips/TripsList";
import {formItemLayout} from "./trips/AddTrip";
import styles from '../css/Home.module.css';
import {toast} from "react-toastify";

class Home extends Component {
    formRef = React.createRef(); //uncontrolled component
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            ownTrips: false,
            nextMonthTrips: false,
            destination: null,
            startDateMin: null,
            startDateMax: null,
            endDateMin: null,
            endDateMax: null,
            filter: false
        }

        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeStartDateMin = this.onChangeStartDateMin.bind(this);
        this.onChangeStartDateMax = this.onChangeStartDateMax.bind(this);
        this.onChangeEndDateMin = this.onChangeEndDateMin.bind(this);
        this.onChangeEndDateMax = this.onChangeEndDateMax.bind(this);
        this.getData = this.getData.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.onChangeOwnTrips = this.onChangeOwnTrips.bind(this);
        this.onChangeNextMonthTrips = this.onChangeNextMonthTrips.bind(this);
        this.filter = this.filter.bind(this);
        this.changeState = this.changeState.bind(this);
    }


    componentDidMount() {
        if (LocalStorage.getItem(strings.jwttoken)) {
            this.getData();
        } else {
            this.props.history.push('/login');
        }
    }

    // async getData(page){
    //     let query='';
    //     if(typeof page!=="number"){
    //         page=0;
    //     }
    //     await this.setState({page:page?page-1:0})
    //     console.log(page,this.state.page);
    //     const values = {
    //         destination: this.state.destination,
    //         startDateMin: this.state.startDateMin,
    //         startDateMax: this.state.startDateMax,
    //         endDateMin: this.state.endDateMin,
    //         endDateMax: this.state.endDateMax,
    //         ownTrips: this.state.ownTrips,
    //         nextMonthTrips: this.state.nextMonthTrips
    //     }
    //     if(values['destination']){
    //         query += `destination=${values['destination']}&`
    //     }
    //     if(values['startDateMin']){
    //         query += `min_start_date=${values['startDateMin']}&`
    //     }
    //     if(values['startDateMax']){
    //         query += `max_start_date=${values['startDateMax']}&`
    //     }
    //     if(values['endDateMin']){
    //         query += `min_end_date=${values['endDateMin']}&`
    //     }
    //     if(values['endDateMax']){
    //         query += `max_end_date=${values['endDateMax']}&`
    //     }
    //     if(values['ownTrips']){
    //         query += `own_trips=${values['ownTrips']}&`
    //     }
    //     if(values['nextMonthTrips']){
    //         query += `next_month_plan=${values['nextMonthTrips']}&`
    //     }
    //     // console.log(query);
    //     // const response = await axios.get(`http://localhost:5000/api/v1/trip?page=${page?page-1:this.state.page}&${query}`);
    //     const [res, err] = await TripService.getTrips(page,query,this.state.page);
    //     if (err) {
    //         alert('error');
    //     } else {
    //         console.log(res.length);
    //         this.setState({data:res,page:page?page-1:1});
    //     }
    //
    // }

    async getData(query = '') {
        if (typeof query === 'object' || query === null) {
            query = '';
        }
        const [data, err] = await TripService.getTrips(query, this.state.page);
        if (err) {
            toast.error(strings.somethingWentWrong);
        } else {
            if (data.length === 0) {
                toast.success(strings.noData);
                // alert('no more data');
            }
            this.setState({data: this.state.data.concat(data), page: this.state.page + 1});
        }
    }

    changeState() {
        if (this.state.startDateMin > this.state.startDateMax) {
            toast.error(strings.startMsg);
            return;
        } else if (this.state.endDateMin > this.state.endDateMax) {
            toast.error(strings.endMsg);
            return;
        }
        this.setState({page: 0, data: [], filter: true});
        this.filter();
    }

    filter() {
        let query = '';
        const values = {
            destination: this.state.destination,
            startDateMin: this.state.startDateMin,
            startDateMax: this.state.startDateMax,
            endDateMin: this.state.endDateMin,
            endDateMax: this.state.endDateMax,
            ownTrips: this.state.ownTrips,
            nextMonthTrips: this.state.nextMonthTrips
        }
        if (values['destination']) {
            query += `destination=${values['destination']}&`
        }
        if (values['startDateMin']) {
            query += `min_start_date=${values['startDateMin']}&`
        }
        if (values['startDateMax']) {
            query += `max_start_date=${values['startDateMax']}&`
        }
        if (values['endDateMin']) {
            query += `min_end_date=${values['endDateMin']}&`
        }
        if (values['endDateMax']) {
            query += `max_end_date=${values['endDateMax']}&`
        }
        if (values['ownTrips']) {
            query += `own_trips=${values['ownTrips']}&`
        }
        if (values['nextMonthTrips']) {
            query += `next_month_plan=${values['nextMonthTrips']}&`
        }
        this.getData(query);
    }


    deleteTrip = async id => {
        const [data, err] = await TripService.deleteTrip(id);
        if (err) {
            toast.error(strings.somethingWentWrong);
        } else {
            toast.success(strings.tripDeleted);
            const [res, err] = await TripService.getTrips('', 0);
            if (err) {
                toast.error(strings.somethingWentWrong);
            } else {
                this.setState({data: res});
            }
        }
    };

    onChangeOwnTrips(e) {
        this.setState({ownTrips: e.target.checked});
    }

    onChangeNextMonthTrips(e) {
        this.setState({nextMonthTrips: e.target.checked});
    }

    onChangeDestination(e) {
        this.setState({destination: e.target.value});
    }

    onChangeStartDateMin(date, dateString) {
        this.setState({startDateMin: dateString});
    }

    onChangeStartDateMax(date, dateString) {
        this.setState({startDateMax: dateString});
    }

    onChangeEndDateMin(date, dateString) {
        this.setState({endDateMin: dateString});
    }

    onChangeEndDateMax(date, dateString) {
        this.setState({endDateMax: dateString});
    }

    async clearFilters() {
        await this.setState({
            data: [],
            filter: false,
            page: 0,
            ownTrips: false,
            nextMonthTrips: false,
            destination: '',
            startDateMin: null,
            startDateMax: null,
            endDateMin: null,
            endDateMax: null,
        });
        this.formRef.current.resetFields();
        this.getData();
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="w-50 mx-auto shadow p-5">
                        <Form
                            className={styles.form}
                            name="time_related_controls"
                            {...formItemLayout}
                            onFinish={this.changeState}
                            ref={this.formRef}>
                            <Form.Item
                                name="destination"
                                className={styles.destinationInput}>
                                <Input
                                    prefix={<GlobalOutlined className="site-form-item-icon"/>}
                                    placeholder="Destination" onChange={this.onChangeDestination}/>
                            </Form.Item>
                            <Form.Item
                                name="startDateMin"
                                label="Start Date Min">
                                <DatePicker
                                    onChange={this.onChangeStartDateMin}/>
                            </Form.Item>
                            <Form.Item
                                name="startDateMax"
                                label="Start Date Max">
                                <DatePicker onChange={this.onChangeStartDateMax}/>
                            </Form.Item>
                            <Form.Item
                                name="endDateMin"
                                label="End Date Min">
                                <DatePicker onChange={this.onChangeEndDateMin}/>
                            </Form.Item>
                            <Form.Item
                                name="endDateMax"
                                label="End Date Max">
                                <DatePicker onChange={this.onChangeEndDateMax}/>
                            </Form.Item>

                            {
                                LocalStorage.getItem(strings.role) === 'admin' ?
                                    <Form.Item>
                                        <Checkbox
                                            onChange={this.onChangeOwnTrips}
                                            checked={this.state.ownTrips}>{strings.ownTrips}
                                        </Checkbox>
                                    </Form.Item> : null
                            }
                            <Form.Item>
                                <Checkbox
                                    onChange={this.onChangeNextMonthTrips}
                                    checked={this.state.nextMonthTrips}>
                                    {strings.nextMonthPlan}
                                </Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button">
                                    {strings.search}
                                </Button>
                                <Button
                                    onClick={this.clearFilters}>
                                    {strings.clearFilters}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="container">
                    <table className="table border shadow">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{strings.destination}</th>
                            <th scope="col">{strings.startDate}</th>
                            <th scope="col">{strings.endDate}</th>
                            <th scope="col">{strings.comment}</th>
                            <th scope="col">{strings.count}</th>
                            <th>{strings.action}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.length > 0 ? <>
                            {this.state.data.map((user, index) => (
                                <TripsList user={user} index={index} key={index} deleteTrip={this.deleteTrip}/>
                            ))}</> : <tr>
                            <td>{strings.noData}</td>
                        </tr>}
                        </tbody>
                    </table>
                    {/*<Button onClick={this.getData}>loading more</Button>*/}
                    {this.state.nextMonthTrips ? null :
                        <Button
                            className={styles.loadMore}
                            style={{margin: '0 auto'}}
                            onClick={this.state.filter ? this.filter : this.getData}>
                            {strings.loadMore}
                        </Button>
                        // <Pagination defaultCurrent={1} total={500} onChange={this.getData}/>
                    }
                </div>
            </>

        );
    }
}


export default Home;
