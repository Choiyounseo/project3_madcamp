import {
    BUY_COFFEE,
    BUY_COFFEE_SUCCESS,
    BUY_COFFEE_FAILURE
} from './ActionTypes';
import axios from 'axios';



export function coffeeRequest( coffeeusername, coffeename, cost ) {
    return (dispatch) => {
        dispatch(coffee());

        return axios.post('/api/coffee/buy' , {coffeeusername, coffeename, cost})
        .then((response) => {
            dispatch(coffeeSuccess());
        }).catch((error) => {
            dispatch(coffeeFailure());
        });
    };
}

export function coffee() {
    return{
        type: BUY_COFFEE
    };
}

export function coffeeSuccess() {
    return{
        type: BUY_COFFEE_SUCCESS
    };
}

export function coffeeFailure() {
    return{
        type: BUY_COFFEE_FAILURE
    };
}
