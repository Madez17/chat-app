import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    general: [
        {from: 'Juan', msg: 'Hi'},
        {from: 'María', msg: 'Hello'},
        {from: 'Carlos', msg: 'Hi'},
    ],
    topic2: [
        {from: 'Juan', msg: 'Hi'},
        {from: 'Juan', msg: 'Hi'},
        {from: 'Juan', msg: 'Hi'},
    ]
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

export default function Store(props) {
    if (!socket) {
        socket = io(':3001')
    }

    const reducerHook = React.useReducer(reducer, initState);

    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}
