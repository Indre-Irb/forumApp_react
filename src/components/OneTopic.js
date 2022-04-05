import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";
import MyContext from "../context/MyContext";
import Replies from "./Replies";
import PaginationMain from "./PaginationMain";


const OneTopic = () => {

    const [getPost, setPost] = useState([])
    const [getComments, setComments] = useState([])
    const [getPageCount, setPageCount] = useState(0);
    const {getActivePage, setActivePage} = useContext(MyContext)
    const {getUser} = useContext(MyContext)
    const {setNotification} = useContext(MyContext)
    const nav = useNavigate()
    const {id} = useParams()
    const reply = useRef()
    const media = useRef()

    useEffect(() => {
            http.get(`openTopic/${id}/${getActivePage}`).then(res => {
                if (res.success) {
                    setPost(res.oneTopic)
                    setComments(res.findComments)
                    setPageCount(res.findCommentCount)
                }
            })
    }, [getActivePage])



    function changePage (newActivePage) {
        setActivePage(newActivePage);
        nav(`/main/${id}/?page=${newActivePage}`);
    }

    async function publish() {
        const replyInfo = {
            postId: id,
            user: getUser,
            comment: reply.current.value,
            media: media.current.value,
            time: new Date().toLocaleTimeString('lt-LT')
        }
        http.post(replyInfo, "replies").then(res => {
            if (res.success) {
                console.log(res)
                nav(`/main/${id}/?page=${getActivePage}`);
            }
        })
    }


    return (
        <div>
            <div className="d-flex j-center al-center">
                {getPost &&
                    <div className="topic d-flex s-around al-center">
                        <div>{getPost.post} </div>
                        <div> {getPost.username}</div>
                        <div>{getPost.time}</div>
                    </div>
                }
            </div>
            {getUser &&
                <div className="replyInputs d-flex f-column al-center">
                    <input type="text" ref={reply} placeholder="Write your thoughts"/>
                    <input type="text" ref={media} placeholder="Add photo or video"/>
                    <button onClick={publish}>Publish comment</button>
                </div>}
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