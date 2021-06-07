import {toast} from "react-toastify";

export class GenUtils {

    static permissionCheck(err, props) {
        if (err[0] === 404) {
            props.history.push('/404');
            toast.error(err[1]);
        } else if (err[0] === 403) {
            props.history.push('/');
            toast.error(err[1]);
        }
    }

    static checkError(err) {
        if (err[0] === 404) {
            toast.error(err[1]);
        } else if (err[0] === 403) {
            toast.error(err[1]);
        }
    }

}