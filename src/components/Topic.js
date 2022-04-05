import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {IoStarOutline, IoStar} from 'react-icons/io5';
import MyContext from "../context/MyContext";

const Topic = ({topic}) => {

    const {getUser} = useContext(MyContext)
    const {setNotification} = useContext(MyContext)
    const {getNotificationInfo, setNotificationInfo} = useContext(MyContext)
    const nav = useNavigate()
    const {getFavorite, setFavorite} = useContext(MyContext)
    const favoriteList = JSON.parse(localStorage.getItem("MyFavorites") || "0");

    useEffect(() => {
        if (favoriteList !== 0) {
            setFavorite([...favoriteList])
        }

    }, [getFavorite])

    useEffect(() => {
        if (getUser) {
            if (getUser._id === topic.userId && topic.isRead) {
                setNotification(true)
                console.log(topic)
                setNotificationInfo([...getNotificationInfo, topic])
            }
        }
    }, [])


    function open(id) {
        nav(`/main/${id}`)
    }

    function addFavorite(id) {
        let myFavorites = getFavorite;
        let addArray = true;

        myFavorites.map((fav) => {
            if (fav === id) {
                let index = myFavorites.indexOf(fav)
                if (index !== -1) {
                    myFavorites.splice(index, 1)
                    addArray = false
                    console.log(myFavorites)
                }
            }
        });
        if (addArray) {
            myFavorites.push(id)
        }
        setFavorite([...myFavorites])
        return localStorage.setItem("MyFavorites", JSON.stringify(getFavorite))
    }

    return (
        <div className="forumBox d-flex al-center">

            {!getFavorite.includes(topic._id) ?
                <div className="flex1 d-flex al-center j-center favoriteIcon" onClick={() => addFavorite(topic._id)}>
                    <IoStarOutline/>
                </div>
                :
                <div className="flex1 d-flex al-center j-center favoriteIcon" onClick={() => addFavorite(topic._id)}>
                    <IoStar/>
                </div>}
            <div className="d-flex flex6 al-center" onClick={() => open(topic._id)}>
                <div className="flex4 topicHeadline">{topic.post}</div>
                <div className="flex1">post by {topic.username}</div>
                <div className="flex2 d-flex f-column al-center j-center">
                    <div>
                        post published
                    </div>
                    <div>
                        {topic.time}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Topic;