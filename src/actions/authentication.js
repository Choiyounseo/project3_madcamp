import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';
/*axios는 저희가 AJAX 요청을 할 때 사용 할 HTTP Client 입니다

React 는 뷰만 담당하는 라이브러리이기 때문에, 서버와의 통신을 하려면 이렇게 써드 파티 라이브러리를 사용해야합니다.

물론, axios 외에도 다른 HTTP 클라이언트를 사용해도 됩니다.*/

//thunk:특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미

/* ====== AUTH ====== */

/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
            dispatch(login()); //login이 반환한 thunk처리!

            return axios.post('/api/account/signin', { username, password })
            .then((response) => {
                dispatch(loginSuccess(username)); //loginSuccess가 반환한 thunk 처리 | when SUCCEED
            }).catch((error) => {
                dispatch(loginFailure()); // when FAILED
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(username, password) {
    return (dispatch) => {
        // inform register API is starting
        dispatch(register());

        return axios.post('/api/account/signup', { username, password })
        .then((reponse) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS */

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('/api/account/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.username));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}


/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
