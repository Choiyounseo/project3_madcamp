import React from 'react';
import { connect } from 'react-redux';
import { Menutable } from 'components';
import { browserHistory } from 'react-router';

class Menu extends React.Component {
    render(){
        return (
          <div>
            <Menutable />
          </div>
        );
    }
}

export default Menu;
