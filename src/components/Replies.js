import React, {useEffect, useState} from 'react';
import http from '../plugins/http'

import {useNavigate} from "react-router-dom";

const Replies = ({replies}) => {

    const [getUserPhoto, setUserPhoto] = useState("")

    const nav = useNavigate()

    useEffect(() => {
        http.get(`replyPhoto/${replies.userId}`).then(res => {
            if (res.success) {
                setUserPhoto(res.findUser.image)
            }
        })
    }, [replies])

    return (
        <div  className="replyBox d-flex f-column-rev al-center s-evenly">
            <div onClick={()=> nav(`/main/${replies.postId}`)} className="replyField d-flex s-evenly al-center f-md-column">
                <div className="replyImg flex1 d-flex f-column s-evenly al-center">
                    <img src={getUserPhoto} alt=""/>
                    <div className="flex1">{replies.username}</div>
                </div>
                <div className="reply flex4 d-flex al-center">
                    <div dangerouslySetInnerHTML={{__html: replies.post}}/>
                </div>
                <div className="flex1">{replies.time}</div>
            </div>
        </div>
    );
};

export default Replies;