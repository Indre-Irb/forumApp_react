import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MyContext from '../context/MyContext'
import http from '../plugins/http'
import NotificationBadge from "./NotificationBadge";


const Toolbar = () => {

    const {getUser, setUser} = useContext(MyContext)
    const {getTopicModal, setTopicModal} = useContext(MyContext)
    const {getNotification, setNotification} = useContext(MyContext)
    const {getNotificationInfo} = useContext(MyContext)
    const nav = useNavigate()

    function logout() {
        http.get("logout").then(res => {
            if (res.success) {
                setNotification(false)
                setTopicModal(false)
                setUser(null)
                nav("/login")
            }
        })
    }

    return (
        <div className="toolbar d-flex s-around al-center">
            <div className="flex1 d-flex j-center">
                Forum
            </div>
            <div className="registerDiv flex1 d-flex al-center j-center" onClick={() => nav("/main")}>Main</div>
            {!getUser &&
                <div className="d-flex s-evenly al-center flex4">
                    <div className="loginDiv flex1 d-flex al-center j-center" onClick={() => nav('/login')}>Login</div>
                    <div className="registerDiv flex1 d-flex al-center j-center"
                         onClick={() => nav('/register')}>Register
                    </div>
                </div>}
            {getUser &&
                <div className="flex2 d-flex s-evenly al-center">
                    <div onClick={() => setTopicModal(!getTopicModal)} className="flex1">Create Topic</div>
                    <div className="flex1" onClick={() => nav('/profile')}>Profile</div>
                    <div className="flex1" onClick={() => nav("/favorites")}>Favorites</div>
                    <div onClick={logout} className="flex1">Logout</div>
                </div>}
            <div className="d-flex f-column">
                {getNotification && getUser &&
                    getNotificationInfo.map((notify, ind) =>
                        <NotificationBadge notify={notify} key={ind}/>
                    )}
            </div>

        </div>
    );
};

export default Toolbar;