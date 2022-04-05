import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
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
        <div className="toolbar d-flex s-around al-center f-md-column h-md-auto">
            <div className="flex1 d-flex j-center al-center">
               <h4>FORUM</h4>
            </div>
            <div className="registerDiv flex1 d-flex al-center j-center f-md-column" onClick={() => nav("/main")}>Main</div>
            {!getUser &&
                <div className="d-flex s-evenly al-center flex4 f-md-column">
                    <div className="loginDiv flex1 d-flex al-center j-center" onClick={() => nav('/login')}>Login</div>
                    <div className="registerDiv flex1 d-flex al-center j-center"
                         onClick={() => nav('/register')}>Register
                    </div>
                </div>}
            {getUser &&
                <div className="flex2 d-flex s-evenly al-center f-md-column f-md-column">
                    <div onClick={() => setTopicModal(!getTopicModal)} className="flex1 divHover d-flex al-center j-center">Create Topic</div>
                    <div className="flex1 divHover d-flex al-center j-center" onClick={() => nav('/profile')}>Profile</div>
                    <div className="flex1 divHover d-flex al-center j-center" onClick={() => nav("/favorites")}>Favorites</div>
                    <div onClick={logout} className="flex1 divHover d-flex al-center j-center">Logout</div>
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