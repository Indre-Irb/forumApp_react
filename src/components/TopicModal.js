import React, {useContext, useRef, useState} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const TopicModal = () => {

    const {setTopicModal} = useContext(MyContext)
    const [getMessage, setMessage] = useState("")

    const nav = useNavigate()
    const topic = useRef()

    function publishTopic(){
        const text = {
            topic: topic.current.value
        }
        http.post(text, "writeTopic").then(res =>{
            if(res.success){
                setTopicModal(false)
                nav("/main")
            } else {
                setMessage(res.message)
            }
        })
    }

    return (
        <div className="d-flex f-column j-center al-center ">
            {getMessage && <div style={{color:`#2d4659`}}>{getMessage}</div> }
            <div className="topicModal d-flex s-around al-center f-md-column">
                <div style={{color:`#2d4659` }}>Create topic</div>
                <input type="text" ref={topic} placeholder="Create Topic"/>
                <button onClick={publishTopic}>Publish</button>
            </div>
        </div>
    );
};

export default TopicModal;