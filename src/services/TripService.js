import awaitTo from "async-await-error-handling";
import axios from "axios";
import Endpoints, {getError} from "./Endpoints";


export default class TripService {

    // static async getTrips(page,query,statePage) {
    //     console.log(`${Endpoints.GET_TRIPS}?page=${page?page-1:statePage}&${query}`);
    //     const [err, data] = await awaitTo(
    //         axios.get(`${Endpoints.GET_TRIPS}?page=${page?page-1:statePage}&${query}`)
    //     );
    //     if (!err) return [data.data.data, ''];
    //     return [{}, getError(err)];
    // }
    static async getTrips(query, page) {
        console.log(query, 'query');
        console.log(`${Endpoints.GET_TRIPS}?page=${page}&${query}`);
        const [err, data] = await awaitTo(
            axios.get(`${Endpoints.GET_TRIPS}?page=${page}&${query}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async deleteTrip(tripId) {
        const [err, data] = await awaitTo(
            axios.delete(`${Endpoints.DELETE_TRIP_BY_ID}/${tripId}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async updateTrip(tripId, values) {
        const [err, data] = await awaitTo(
            axios.put(`${Endpoints.UPDATE_TRIP_BY_ID}/${tripId}`, values)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async viewTrip(tripId) {
        const [err, data] = await awaitTo(
            axios.get(`${Endpoints.GET_TRIP_BY_ID}/${tripId}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async addTrip(values) {
        const [err, data] = await awaitTo(
            axios.post(`${Endpoints.CREATE_TRIP}/`, values)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

}