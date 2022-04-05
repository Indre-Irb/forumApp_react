import React, {useContext, useEffect, useState} from 'react';
import http from '../plugins/http'
import MyContext from "../context/MyContext";

const Replies = ({replies}) => {

    const [getUserPhoto, setUserPhoto] = useState("")
    const {getActivePage} = useContext(MyContext)
    const {setNotification} = useContext(MyContext)
    const [getVideo, setVideo] = useState("")
    const [getImage, setImage] = useState("")
    const [getLink, setLink] = useState("")

    useEffect(() => {
        http.get(`replyPhoto/${replies.userId}`).then(res => {
            if (res.success) {
                setUserPhoto(res.findUser.image)
            }
        })
    }, [replies])


    // const videoValid = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    // const imageValid = /\.(jpg|jpeg|png|gif|bmp)$/
    //
    // const linkText = replies.post.replace(/(https?\:\/\/)?([^\.\s]+)?[^\.\s]+\.[^\s]+/gi, (media) => {
    //    console.log(linkText)
    //     console.log(media)
    //     // if (videoValid.test(media)) {
    //     //     setVideo(media)
    //     //     // return `<iframe src=${media}></iframe>`
    //     // }
    //     if (imageValid.test(media)) {
    //         setImage(media)
    //         console.log(media, "image")
    //         // return `<img src=${media} alt/>`
    //     }
    //     // if(!imageValid.test(media) && !videoValid.test(media)) {
    //     //    setLink(media)
    //     //     // return `<a>${media}</a>`
    //     // }
    // })


    return (
        <div className="replyBox d-flex f-column-rev al-center s-evenly">
            <div className="replyField d-flex s-evenly al-center">
                <div className="replyImg flex1 d-flex f-column s-evenly al-center">
                    <img src={getUserPhoto} alt=""/>
                    <div className="flex1">{replies.username}</div>
                </div>
                <div className="replyImage flex4">
                    <div className="replyImage" dangerouslySetInnerHTML={{__html: replies.post}}/>
                </div>
                <div className="flex1">{replies.time}</div>
            </div>
        </div>
    );
};

export default Replies;