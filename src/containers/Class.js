import React from 'react';
import { connect } from 'react-redux';
import { Classboard } from 'components';
import { browserHistory } from 'react-router';

class Class extends React.Component {
    render(){
        return (
          <div>
            <Classboard />
          </div>
        );
    }
}

export default Class;
