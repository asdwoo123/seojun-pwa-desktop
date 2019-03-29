import { createAction, handleActions } from 'redux-actions';
import io from 'socket.io-client';
import axios from 'axios';
import * as Main from './mainReducer';
import * as Cctv from './cctvReducer';


const isReady = 'isReady';
const notReady = 'notReady';
const connectIP = 'connectIP';
const saveIPList = 'saveIPList';
const getIsReady = createAction(isReady);
const getNotReady = createAction(notReady);
const setConnectIP = createAction(connectIP);
export const setSaveIPList = createAction(saveIPList);
let socket = null;

export function socketDataLoad(ip) {
    return (dispatch) => {
        socketOnStart(ip, dispatch);
    }
}

export function socketDisConnect() {
    return (dispatch) => {
        socket.disconnect();
        dispatch(setConnectIP(null));
        dispatch(Cctv.setCctv(null));
    }
}

export function networkConnect(ip) {
    return new Promise((res, rej) => {
        axios.get(`http://${ip}:3000`)
            .then((response) => res(response.data))
            .catch((reject) => {rej(reject)});
    });
}

async function connectList(url, name, dispatch) {
    try {
        let listItem = await localStorage.getItem('server-lists');
        if (listItem) {
            const hasIp = listItem.some(x => x.ip === url);
            if (!hasIp) {
                listItem.unshift({ip: url, name});
                await localStorage.setItem('server-lists',  listItem);
                dispatch(setSaveIPList(listItem));
            }
        } else {
            await localStorage.setItem('server-lists', [{ip: url, name}]);
            dispatch(setSaveIPList([{ip: url, name}]));
        }
    } catch (e) {
        console.error(e.toString());
    }
}

function socketOnStart(obj, dispatch) {
    const { ip, name } = obj;
    const socketUrl = ip;
    socket = io(`http://${socketUrl}:3000`, {
        path: '/socket.io'
    });

    socket.on('disconnect', () => {
        dispatch(getNotReady());
    });

    socket.on('connect', () => {
        console.log('연결 되었습니다.');
        dispatch(getIsReady());
        dispatch(setConnectIP(socketUrl));
        dispatch(Cctv.setCctv(`http://${socketUrl}:8090?action=stream`));
        connectList(socketUrl, name, dispatch);

        socket.on('C_Total', (data) => {
            console.log(data.value);
            dispatch(Main.getC_total(data.value));
        });

        socket.on('Cycle time', (data) => {
            dispatch(Main.getCycleTime(data.value));
        });

        socket.on('sPartnumber', (data) => {
            dispatch(Main.getsPartnumber(data.value));
        });

        socket.on('image_uri', (data) => {
           dispatch(Main.getImage_uri('data:image/png;base64,' + data.value));
        });
    });
}

const initialState = {
    isReady: false,
    connectIP: null,
    saveIPList: [{ip: '192.168.0.34', name: 'momoland'}, {ip: '192.168.0.34', name: 'momoland'}]
};

export default handleActions({
    [isReady]: (state, action) => {
        return {
            ...state,
            isReady: true
        }
    },
    [notReady]: (state, action) => {
        return {
            ...state,
            isReady: false
        }
    },
    [connectIP]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            connectIP: data
        }
    },
    [saveIPList]: (state, action) => {
        const data = action.payload;
        return {
            ...state,
            saveIPList: data
        }
    }
}, initialState);

