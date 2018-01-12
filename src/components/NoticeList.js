import React from 'react';
import { Notice } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NoticeList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const mapToComponents = data => {
            return data.map((notice, i) => {
                return (
                    <Notice
                        data={notice}
                        ownership={ notice.writer===this.props.currentUser }
                        key={notice._id}
                        onEdit={this.props.onEdit}
                        onRemove={this.props.onRemove}
                        onStar={this.props.onStar}
                        index={i}
                        currentUser={this.props.currentUser}
                    />
                );
            });
        };

        return(
            <div>
                <ReactCSSTransitionGroup
                    transitionName="notice"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

NoticeList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func
};

NoticeList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('onEdit not defined');
    },
    onRemove: (id, index) => {
        console.error('onRemove not defined');
    },
    onStar: (id, index) => {
        console.error('onStar not defined');
    }
};

export default NoticeList;
