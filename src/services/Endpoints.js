import {strings} from "../constant/strings";

export default class Endpoints {

    static BASE_API = 'http://localhost:5000/api/v1';

    static GET_ALL_USERS = `${Endpoints.BASE_API}/user?page=`;

    static GET_USER_BY_ID = `${Endpoints.BASE_API}/user`;

    static DELETE_USER_BY_ID = `${Endpoints.BASE_API}/user`;

    static UPDATE_USER_BY_ID = `${Endpoints.BASE_API}/user`;

    static GET_TRIPS = `${Endpoints.BASE_API}/trip`;

    static UPDATE_TRIP_BY_ID = `${Endpoints.BASE_API}/trip`;

    static DELETE_TRIP_BY_ID = `${Endpoints.BASE_API}/trip`;

    static GET_TRIP_BY_ID = `${Endpoints.BASE_API}/trip`;

    static SIGNUP = `${Endpoints.BASE_API}/user/signup`;

    static LOGIN = `${Endpoints.BASE_API}/user/login`;

    static CREATE_USER = `${Endpoints.BASE_API}/user`;

    static CREATE_TRIP = `${Endpoints.BASE_API}/trip`;

}

export const getError = (err) => {
    try {
        if (err?.response) {
            if (err?.response?.status === 500) {
                return [err.response.status, 'Internal Server Error'];
            }
            if (err?.response?.status === 404) {
                return [err.response.status, 'Not found'];
            }
            if (err?.response?.status === 403) {
                return [err.response.status, 'Permission Denied'];
            }
            if (err?.response?.status === 401) {
                return [err.response.status, 'Unauthorized Access'];
            }
            if (err?.response?.data?.message) {
                return [err.response.status, err.response.data.message];
            }
            return (err).response.data.errorMessage(
                strings.something_went_wrong
            );
        }
        return 'Something went wrong';
    } catch (ex) {
        return 'Something went wrong';
    }
}
