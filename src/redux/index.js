import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import socket from './socketReducer';
import locale from './localeReducer';


const reducer = combineReducers({
    socket,
    locale
});

export default createStore(
    reducer,
    applyMiddleware(thunk)
);



