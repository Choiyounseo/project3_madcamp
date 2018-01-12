import React from 'react';
import { connect } from 'react-redux';
import { Write, NoticeList } from 'components';
import {
    noticePostRequest,
    noticeListRequest,
    noticeEditRequest,
    noticeRemoveRequest,
    noticeStarRequest
} from 'actions/notification';
import {searchRequest} from 'actions/search';


class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.loadNewNotice = this.loadNewNotice.bind(this);
        this.loadOldNotice = this.loadOldNotice.bind(this);
        this.state = {
            loadingState: false,
            initiallyLoaded: false
        };
    }

    componentDidMount() {
        const loadNoticeLoop = () => {
            this.loadNewNotice().then(
                () => {
                    this.noticeLoaderTimeoutId = setTimeout(loadNoticeLoop, 5000);
                }
            );
        };

        const loadUntilScrollable = () => {
            // IF THE SCROLLBAR DOES NOT EXIST,
            if($("body").height() < $(window).height()) {
                this.loadOldNotice().then(
                    () => {
                        // DO THIS RECURSIVELY UNLESS IT'S LAST PAGE
                        if(!this.props.isLast) {
                            loadUntilScrollable();
                        }
                    }
                );
            }
        };


        this.props.noticeListRequest(true, undefined, undefined, this.props.username).then(
            () => {
                setTimeout(loadUntilScrollable, 1000);
                loadNoticeLoop();
                this.setState({
                    initiallyLoaded: true
                });
            }
        );

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState) {
                    this.loadOldNotice();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if(this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        // STOPS THE loadnoticeLoop
        clearTimeout(this.noticeLoaderTimeoutId);

        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();

        this.setState({
            initiallyLoaded: false
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.username !== prevProps.username) {
            this.componentWillUnmount();
            this.componentDidMount();
        }
    }

    loadNewNotice() {
         // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.noticeData.length === 0 )
            return this.props.noticeListRequest(true);



        return this.props.noticeListRequest(false, 'new', this.props.noticeData[0]._id, this.props.username);
    }

    loadOldNotice() {
        // CANCEL IF USER IS READING THE LAST PAGE
        if(this.props.isLast) {
            return new Promise(
                (resolve, reject)=> {
                    resolve();
                }
            );
        }

        // GET ID OF THE notice AT THE BOTTOM
        let lastId = this.props.noticeData[this.props.noticeData.length - 1]._id;

        // START REQUEST
        return this.props.noticeListRequest(false, 'old', lastId, this.props.username).then(() => {
            // IF IT IS LAST PAGE, NOTIFY
            if(this.props.isLast) {
                Materialize.toast('You are reading the last page', 2000);
            }
        });
    }

    handlePost(contents) {
        return this.props.noticePostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW notice
                    // TO BE IMPLEMENTED
                    this.loadNewNotice().then(
                        () => {
                            Materialize.toast("Success!", 2000);
                        }
                    );
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */

                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    handleEdit(id, index, contents) {
        return this.props.noticeEditRequest(id, index, contents).then(() => {
            if(this.props.editStatus.status === 'SUCCESS') {
                Materialize.toast('Success!', 2000);
            } else {
                /*
                       ERROR CODES
                           1: INVALID ID,
                           2: EMPTY CONTENTS
                           3: NOT LOGGED IN
                           4: NO RESOURCE
                           5: PERMISSION FAILURE
                */
                let errorMessage = [
                        'Something broke',
                        'Please write soemthing',
                        'You are not logged in',
                        'That notice does not exist anymore',
                        'You do not have permission'
                    ];

                let error = this.props.editStatus.error;

                // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);

                // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                if(error === 3) {
                    setTimeout( ()=> {location.reload(false);}, 2000);
                }


            }
        });
    }

    handleRemove(id, index) {
        this.props.noticeRemoveRequest(id, index).then(
            () => {
                if(this.props.removeStatus.status === "SUCCESS") {
                    setTimeout(() => {
                        if($("body").height() < $(window).height()) {
                            this.loadOldNotice();
                        }
                    }, 1000);
                } else {
                    /*
                    DELETE Notice: DELETE /api/Notice/:id
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'You are not logged in',
                        'That Notice does not exist',
                        'You do not have permission'
                    ];

                     // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);


                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.removeStatus.error === 2) {
                        setTimeout(()=> {location.reload(false);}, 2000);
                    }
                }
            }
        );
    }

    handleStar(id, index) {
        this.props.noticeStarRequest(id, index).then(
            () => {
                if(this.props.starStatus.status !== "SUCCESS") {
                    /*
                        TOGGLES STAR OF notice: POST /api/notice/star/:id
                        ERROR CODES
                            1: INVALID ID
                            2: NOT LOGGED IN
                            3: NO RESOURCE
                    */
                    let errorMessage= [
                        'Something broke',
                        'You are not logged in',
                        'That notice does not exist'
                    ];


                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.starStatus.error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);


                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.starStatus.error === 2) {
                        setTimeout(()=> {location.reload(false);}, 2000);
                    }
                }
            }
        );
    }

    render() {
        const write = (<Write onPost={this.handlePost}/>);

        const emptyView = (
            <div className="container">
                <div className="empty-page">
                    <b>{this.props.username}</b> isn't registered or hasn't written any notice
                </div>
            </div>
        );

        const wallHeader = (
            <div>
                <div className="container wall-info">
                    <div className="card wall-info blue lighten-2 white-text">
                        <div className="card-content">
                            {this.props.username}
                        </div>
                    </div>
                </div>
                { this.state.initallyLoaded  && this.props.noticeData.length === 0 ? emptyView : undefined }
            </div>
        );

        return (
            <div className="wrapper">
                { typeof this.props.username !== 'undefined' ? wallHeader : undefined }
                {this.props.isLoggedIn ? <Write onPost={this.handlePost}/> : undefined}
                <NoticeList data={this.props.noticeData} currentUser={this.props.currentUser}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                    onStar={this.handleStar}/>
            </div>
        );
    }
}

Notifications.PropTypes = {
    username: React.PropTypes.string
};

Notifications.defaultProps = {
    username: undefined
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.notice.post,
        currentUser: state.authentication.status.currentUser,
        noticeData: state.notice.list.data,
        listStatus: state.notice.list.status,
        isLast: state.notice.list.isLast,
        editStatus: state.notice.edit,
        removeStatus: state.notice.remove,
        starStatus: state.notice.star
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        noticePostRequest: (contents) => {
            return dispatch(noticePostRequest(contents));
        },
        noticeListRequest: (isInitial, listType, id, username) => {
            return dispatch(noticeListRequest(isInitial, listType, id, username));
        },
        noticeEditRequest: (id, index, contents) => {
            return dispatch(noticeEditRequest(id, index, contents));
        },
        noticeRemoveRequest: (id, index) => {
            return dispatch(noticeRemoveRequest(id, index));
        },
        noticeStarRequest: (id, index) => {
            return dispatch(noticeStarRequest(id, index));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
