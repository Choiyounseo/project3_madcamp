import authentication from './authentication';
import memo from './memo';
import search from './search';
import coffee from './coffee';
import notice from './notice';

//여러 reducer 사용!!
import { combineReducers } from 'redux';

export default combineReducers({
    authentication, memo, search, coffee, notice
});
