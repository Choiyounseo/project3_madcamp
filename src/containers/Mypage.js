import React from 'react';
import { connect } from 'react-redux';
import { Mypagelist } from 'components';
import { Login } from 'containers';
import { browserHistory } from 'react-router';
import { loginRequest } from 'actions/authentication';

class Mypage extends React.Component {
    render(){
        return (
          <div>
              <Mypagelist />
          </div>
        );
    }
}

export default Mypage;
