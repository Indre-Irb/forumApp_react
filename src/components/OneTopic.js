import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";
import MyContext from "../context/MyContext";
import Replies from "./Replies";
import PaginationMain from "./PaginationMain";
import Topic from "./Topic";


const OneTopic = () => {

    const [getPost, setPost] = useState([])
    const [getComments, setComments] = useState([])
    const [getPageCount, setPageCount] = useState(0);
    const {getActivePage, setActivePage} = useContext(MyContext)
    const {getUser} = useContext(MyContext)
    const {setNotification} = useContext(MyContext)
    const [getMessage, setMessage] = useState("")
    const nav = useNavigate()
    const {id} = useParams()
    const reply = useRef()

    useEffect(() => {
        http.get(`openTopic/${id}/${getActivePage}`).then(res => {
            if (res.success) {
                setPost(res.oneTopic)
                setComments(res.findComments)
                setPageCount(res.findCommentCount)
            }
        })
    }, [getActivePage])


    function changePage(newActivePage) {
        setActivePage(newActivePage);
        nav(`/main/${id}/?page=${newActivePage}`);
    }

    async function publish() {
        const replyInfo = {
            postId: id,
            user: getUser,
            comment: reply.current.value,
            time: new Date().toLocaleTimeString('lt-LT')
        }
        http.post(replyInfo, "replies").then(res => {
            if (res.success) {
                nav(`/main`);
            } else {
                setMessage(res.message)
            }
        })
    }


    return (
        <div className="oneTopicField ">
            <div className="d-flex j-center al-center">
                {getPost && <Topic topic={getPost}/>}
            </div>

            {getUser &&
                <div className="d-flex j-center al-center">
                    <div className="replyInputs d-flex f-column al-center j-center">
                        {getMessage && <div style={{color: `#819f7f`}}>{getMessage}</div> }
                        <input type="text" ref={reply} placeholder="Write your thoughts"/>
                        <button onClick={publish}>Publish comment</button>
                    </div>
                </div>}
            <div className="d-flex j-center al-center mt-30">
                <PaginationMain
                    activePage={getActivePage}
                    changePage={changePage}
                    getPageCount={getPageCount}
                />
            </div>
            <div className="d-flex j-center al-center">
                <div className="replyField d-flex f-column al-center j-center">
                    {getComments && getComments.map((replies, ind) => <Replies replies={replies} key={ind}/>
                    )}
                </div>
            </div>
            <div className="d-flex j-center al-center">
                <PaginationMain
                    activePage={getActivePage}
                    changePage={changePage}
                    getPageCount={getPageCount}
                />
            </div>
        </div>
    );
};

export default OneTopic;