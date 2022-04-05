import React, {useContext, useRef} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const TopicModal = () => {

    const {setTopicModal} = useContext(MyContext)

    const nav = useNavigate()
    const topic = useRef()

    function publishTopic(){
        const text = {
            topic: topic.current.value
        }
        http.post(text, "writeTopic").then(res =>{
            if(res.success){
                console.log(res)
                setTopicModal(false)
                nav("/main")
            }
        })
    }

    return (
        <div>
            <div className="topicModal d-flex s-around al-center">
                <h4>Create topic</h4>
                <input type="text" ref={topic} placeholder="Create Topic"/>
                <button onClick={publishTopic}>Publish</button>
            </div>
        </div>
    );
};

export default TopicModal;