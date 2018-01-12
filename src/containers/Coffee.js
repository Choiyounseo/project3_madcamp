import React from 'react';
import { connect } from 'react-redux';
import { Coffeetable } from 'components';
import { browserHistory } from 'react-router';
import { coffeeRequest } from 'actions/coffee';

class Coffee extends React.Component {

    constructor(props) {
        super(props);
        this.handleCoffee = this.handleCoffee.bind(this);
    }

    handleCoffee(coffeeusername, coffeename, cost) {
        return this.props.coffeeRequest(coffeeusername, coffeename, cost).then(
          () => {
              if(this.props.status === "SUCCESS") {
                  Materialize.toast("Buy success!", 2000);
                  return true;
              } else {
                  Materialize.toast({coffeeusername}+{coffeename}+{cost}, 2000);
                  return false;
              }
          }
        );
    }

    render(){
        return (
          <div>
            <Coffeetable onCoffee={this.handleCoffee} username={this.props.username}/>
            {this.props.children}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.coffee.buycoffee
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        coffeeRequest: (coffeename, cost) => {
            return dispatch(coffeeRequest(coffeename, cost));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coffee);
