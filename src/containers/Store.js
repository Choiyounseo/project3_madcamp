import React from 'react';
import { connect } from 'react-redux';
import { Storeinfo } from 'components';
import { browserHistory } from 'react-router';

class Store extends React.Component {
    render(){
        return (
          <div>
            <Storeinfo />
          </div>
        );
    }
}

export default Store;
