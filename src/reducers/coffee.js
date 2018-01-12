import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    buycoffee: {
      status: 'INIT',
      coffeeUsername: '',
      coffeename: '',
      cost: 0
    }
};

export default function coffee(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        case types.BUY_COFFEE:
            return update(state, {
                buycoffee: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.BUY_COFFEE_SUCCESS:
            return update(state, {
                buycoffee: {
                    status: { $set: 'SUCCESS' },
                    coffeeUsername: { $set: action.username },
                    cost: state.cost + 20000
                }
            });
        case types.BUY_COFFEE_FAILURE:
            return update(state, {
                buycoffee: {
                    status: { $set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}
