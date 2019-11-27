import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    general: [
        {from: 'Carlos', msg: 'Hi Maria!'},
        {from: 'María', msg: 'Hello'},
        {from: 'Carlos', msg: 'dummy text of the printing and typesetting industry'},
    ],
    Technology: [
        {from: 'Juan', msg: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'},
        {from: 'Alex', msg: 'is simplys standard dummy'},
        {from: 'Juan', msg: 'Hi'},
    ],
    Social: [
        {from: 'sam', msg: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'},
        {from: 'Alex', msg: 'is simplys standard dummy'},
        {from: 'David', msg: 'Hi'},
    ],
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type){
        case 'RECEIVE_MESSAGE': 
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {
    
    const [allChats, dispatch] = React.useReducer(reducer, initState);
        
    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        });
    }

    const user = 'Mafe' + Math.random(100).toFixed(2)

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}
