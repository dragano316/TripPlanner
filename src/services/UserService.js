import axios from "axios";
import Endpoints, {getError} from "./Endpoints";
import awaitTo from "async-await-error-handling";

export default class UserService {
    static async getAllUsers(page) {
        const [err, data] = await awaitTo(
            axios.get(`${Endpoints.GET_ALL_USERS}${page}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async viewUser(userId) {
        const [err, data] = await awaitTo(
            axios.get(`${Endpoints.GET_USER_BY_ID}/${userId}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }


    static async createUser(values) {
        const [err, data] = await awaitTo(
            axios.post(`${Endpoints.CREATE_USER}/`, values));
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async deleteUser(userId) {
        const [err, data] = await awaitTo(
            axios.delete(`${Endpoints.DELETE_USER_BY_ID}/${userId}`)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async updateUser(userId, values) {
        const [err, data] = await awaitTo(
            axios.put(`${Endpoints.UPDATE_USER_BY_ID}/${userId}`, values)
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async signUp(email, password, role, name) {
        const [err, data] = await awaitTo(
            axios.post(`${Endpoints.SIGNUP}`, {email, password, role, name})
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }

    static async login(email, password) {
        const [err, data] = await awaitTo(
            axios.post(`${Endpoints.LOGIN}`, {email, password})
        );
        if (!err) return [data.data.data, ''];
        return [{}, getError(err)];
    }
}