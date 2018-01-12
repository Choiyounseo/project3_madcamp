//this part is client's side entry
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Login, Register, Wall, Notifications, Menu, Coffee, Brick, Store, Class, Mypage, Tobag } from 'containers';
//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
// thunk 는 특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미
const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root'); // you can check from 'public/index.html' -> can find id=root
//IndexRoute: router의 첫 페이지!
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route path="wall/:username" component={Wall}/>
                <Route path = "notification" component = {Notifications}/>
                <Route path="menu" component= {Menu}/>
                <Route path="coffee" component= {Coffee} />
                <Route path="store" component= {Store} />
                <Route path="class" component ={Class}/>
                <Route path="mypage" component ={Mypage}/>
                <Route path="brick" component={Brick} />
                <Route path="tobag" component={Tobag} />
            </Route>
        </Router>
    </Provider>, rootElement
);
