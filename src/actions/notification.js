import {
    NOTICE_POST,
    NOTICE_POST_SUCCESS,
    NOTICE_POST_FAILURE,
    NOTICE_LIST,
    NOTICE_LIST_SUCCESS,
    NOTICE_LIST_FAILURE,
    NOTICE_EDIT,
    NOTICE_EDIT_SUCCESS,
    NOTICE_EDIT_FAILURE,
    NOTICE_REMOVE,
    NOTICE_REMOVE_SUCCESS,
    NOTICE_REMOVE_FAILURE,
    NOTICE_STAR,
    NOTICE_STAR_SUCCESS,
    NOTICE_STAR_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* NOTICE POST */
export function noticePostRequest(contents) {
    return (dispatch) => {
        dispatch(noticePost());

        return axios.post('/api/notification/', { contents })
        .then((response) => {
            dispatch(noticePostSuccess());
        }).catch((error) => {
            dispatch(noticePostError(error.response.data.code));
        });
    };
}

export function noticePost() {
    return {
        type: NOTICE_POST
    };
}

export function noticePostSuccess() {
    return {
        type: NOTICE_POST_SUCCESS
    };
}

export function noticePostFailure(error) {
    return {
        type: NOTICE_POST_FAILURE,
        error
    };
}

/* notice LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' notice or 'new' notice
        - id:        OPTIONAL; notice id (one at the bottom or one at the top)
        - username:  OPTIONAL; find notices of following user
*/
export function noticeListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        // to be implemented
        dispatch(noticeList());

        let url = '/api/notification';

        if(typeof username === "undefined") {
            // username not given, load public notice
            url = isInitial ? url : `${url}/${listType}/${id}`;
            // or url + '/' + listType + Z'/' +  id
        } else {
            // load notices of a user
            url = isInitial ? `${url}/${username}` : `${url}/${username}/${listType}/${id}`;
        }

        return axios.get(url)
        .then((response) => {
            dispatch(noticeListSuccess(response.data, isInitial, listType));
        }).catch((error) => {
            dispatch(noticeListFailure());
        });

    };
}
export function noticeList() {
    return {
        type: NOTICE_LIST
    };
}

export function noticeListSuccess(data, isInitial, listType) {
    return {
        type: NOTICE_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function noticeListFailure() {
    return {
        type: NOTICE_LIST_FAILURE
    };
}

/* notice EDIT */
export function noticeEditRequest(id, index, contents) {
    return (dispatch) => {
        dispatch(noticeEdit());

        return axios.put('/api/notification/' + id, { contents })
        .then((response) => {
            dispatch(noticeEditSuccess(index, response.data.notice));
        }).catch((error) => {
            dispatch(noticeEditFailure(error.response.data.code));
        });
    };
}

export function noticeEdit() {
    return {
        type: NOTICE_EDIT
    };
}

export function noticeEditSuccess(index, notice) {
    return {
        type: NOTICE_EDIT_SUCCESS,
        index,
        notice
    };
}

export function noticeEditFailure(error) {
    return {
        type: NOTICE_EDIT_FAILIURE,
        error
    };
}

/* notice REMOVE */
export function noticeRemoveRequest(id, index) {
    return (dispatch) => {
        // TO BE IMPLEMENTED
        dispatch(noticeRemove());

        return axios.delete('/api/notification/' + id)
        .then((response)=> {
            dispatch(noticeRemoveSuccess(index));
        }).catch((error) => {
            console.log(error);
            dispatch(noticeRemoveFailure(error.response.data.code));
        });
    };
}

export function noticeRemove() {
    return {
        type: NOTICE_REMOVE
    };
}

export function noticeRemoveSuccess(index) {
    return {
        type: NOTICE_REMOVE_SUCCESS,
        index
    };
}

export function noticeRemoveFailure(error) {
    return {
        type: NOTICE_REMOVE_FAILURE,
        error
    };
}

/* notice STAR */
export function noticeStarRequest(id, index) {
    return (dispatch) => {
        dispatch(noticeStar());

        return axios.post('/api/notification/star/' + id)
        .then((response) => {
            dispatch(noticeStarSuccess(index, response.data.notice));
        }).catch((error) => {
            console.log(error);
            dispatch(noticeStarFailure());
        });
    };
}

export function noticeStar() {
    return {
        type: NOTICE_STAR
    };
}

export function noticeStarSuccess(index, notice) {
    return {
        type: NOTICE_STAR_SUCCESS,
        index,
        notice
    };
}

export function noticeStarFailure(error) {
    return {
        type: NOTICE_STAR_FAILURE,
        error
    };
}
