import io from 'socket.io-client';

let socket;
let gateway__token;
let user__id;

export const initiateSocket = ({gateway_token,user_id}) => {
    gateway__token = gateway_token;
    user__id = user_id;
     socket = io(`wss://socket.dev.winpro247.com`,
        {
            path: "/socket.io",
            transports: ['websocket'],
            query: {
                token : gateway_token,
                user_id : user_id
            }
        });
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const subscribeToSocket = ({eventName, cb=()=>{},roomtype='public',room='room'}) => {
    if (!socket) return true;

    socket.on(eventName, data => {
        // console.log("connect",{eventName,data})
        cb(data);
    });

    socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err}`)
    })

    // socket.on('disconnect', () => {
    //     console.log('Disconnected from socket server');
    // });
};

export const emitToSocket = ({eventName, roomtype='public',room='room'}) => {
    if (socket) socket.emit(room, { "room": eventName, "token": gateway__token, "user_id": user__id, "roomtype": roomtype });
};
