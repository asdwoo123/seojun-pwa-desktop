import { createAction, handleActions } from 'redux-actions';
import io from 'socket.io-client';
import axios from 'axios';


const connectIP = 'connectIP';
const saveIPList = 'saveIPList';
const projectList = 'projectList';
const rsps = 'rsps';
export const setConnectIp = createAction(connectIP);
export const setProjectList = createAction(projectList);
export const setRsps = createAction(rsps);




const initialState = {
    ip: '',
    saveIPList: [{ip: '192.168.0.34', name: 'momoland'}, {ip: '192.168.0.34', name: 'momoland'}],
    equipment: new Map(),
    projects: [],
    rsps: []
};

export default handleActions({
    [connectIP]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
           ip: data
        }
    },
    [saveIPList]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            saveIPList: data
        }
    },
    [projectList]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            projects: data
        }
    },
    [rsps]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            rsps: data

        }
    }
}, initialState);

