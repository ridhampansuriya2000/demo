import React from "react";
import {disconnectSocket, emitToSocket, initiateSocket, subscribeToSocket} from "./socket";
import {fetchBalance} from "../store/action/commonAction";
import {useDispatch, useSelector} from "react-redux";
import {fetchMatchedDetails, fetchUnMatchedDetails} from "../store/action/gameAction";

const Socket = ({children}) =>{

    const dispatch = useDispatch();

    let { isLogin, user, user_id,   gateway_token } = useSelector((state)=>({
        isLogin : state.auth.isLogin,
        user : state.auth.data?.user,
        gateway_token : state.auth.data?.gateway_token,
        user_id : state.auth.data?.user_id,
    }));

    let token = '';
    let userDetails = '';
    React.useEffect(() => {
        // Check if localStorage is available (in the browser)
        if (typeof window !== 'undefined') {
            // Access localStorage
            token = localStorage.getItem('token');
            userDetails = localStorage.getItem('userDetails');
        }
    }, []);

    React.useEffect( ()=>{
        if(gateway_token && user_id){
            initiateSocket({gateway_token,user_id});
        }
        // Clean up socket connection when component unmounts
        return () => {
            disconnectSocket();
        };
    },[gateway_token,user_id,token]);

    React.useEffect(()=>{
        if(isLogin){
            emitToSocket({
                // eventName:`event_scores`,
                eventName:`user_events_${user_id}`,
                roomtype:'public'
            })
            subscribeToSocket({
                eventName:`user_events_${user_id}`,
                cb:data => dispatch(fetchBalance()),
            });

            emitToSocket({
                // eventName:`event_scores`,
                eventName:`get_expo_room`,
                roomtype:'private'
            })
            subscribeToSocket({
                eventName:`getexporoom_${user_id}`,
                cb:async (data) => {
                    await dispatch(fetchMatchedDetails());
                    await dispatch(fetchUnMatchedDetails());
                    dispatch(fetchBalance())
                },
            });
        }
    },[isLogin,gateway_token,user_id]);

    return(
        <>{children}</>
    )
}

export default Socket;