import React, {useContext, useEffect} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http"
import {useNavigate} from "react-router-dom";

const NotificationBadge = ({notify}) => {

    const {getNotification, setNotification} = useContext(MyContext)
    const nav = useNavigate()

    useEffect (() => {

    }, [getNotification])

    function enterNotification(id){
        http.get(`closeNotification/${id}`).then(res =>
        {
            if(res.success){
                setNotification(false)
                nav(`/main/${notify._id}`)
            }
        })
    }

    function closeNotification(id) {
        http.get(`closeNotification/${id}`).then(res =>
        {
            if(res.success){
                setNotification(false)
            }
        })
    }

    return (
        <div className="notificationBadge">
            <div>
                <div onClick={()=> enterNotification(notify._id)}>{notify.post} </div>
                <div>you have new comment</div>
                <div onClick={() => closeNotification(notify._id)}>Close</div>
            </div>
        </div>
    );
};

export default NotificationBadge;