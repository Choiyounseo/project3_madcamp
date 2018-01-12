import React from 'react';
import { connect } from 'react-redux';
import { Bricksell } from 'components';
import { browserHistory } from 'react-router';


class Brick extends React.Component {
    render(){
        return (
          <div>
            <Bricksell/>
          </div>
        );
    }
}

export default Brick;
