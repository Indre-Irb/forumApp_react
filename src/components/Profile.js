import React, {useContext, useState} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http"
import ChangePhotoModal from "./ChangePhotoModal";
import Replies from "./Replies";

const Profile = () => {

    const {getUser} = useContext(MyContext)

    const {getChangePhoto, setChangePhoto} = useContext(MyContext)
    const [getMyInfo, setMyInfo] = useState([])


    function openPhotoModal() {
        document.body.style.overflow = 'hidden'
        setChangePhoto(true)
    }

    function getMyPost(id) {
        http.get(`myPost/${id}`).then(res => {
            if (res.success) {
                setMyInfo(res.myPosts)
            }

        })
    }

    function getMyTopics(id) {
        http.get(`myTopics/${id}`).then(res => {
            if (res.success) {
                setMyInfo(res.myTopics)
            }
        })
    }

    console.log(getMyInfo)

    return (
        <div>
            {getChangePhoto && <ChangePhotoModal setChangePhoto={setChangePhoto}/>}
            <div className="d-flex al-center j-center">
                {getUser &&
                    <div className="userProfile d-flex j-center">
                        <div className="flex1 d-flex f-column al-center">
                            <img src={getUser.image} alt=""/>
                            <button className="changePhotoButton" onClick={openPhotoModal}>Change profile photo</button>
                        </div>

                        <div className="d-flex f-column flex1 s-evenly">
                            <div>
                                User name: {getUser.username}
                            </div>
                            <div>
                                User email: {getUser.email}
                            </div>
                            <div>
                                Topics created: {getUser.postCount}
                            </div>
                        </div>
                    </div>}
            </div>
            <div className="d-flex al-center j-center">
                <div className="postButton flex1 d-flex j-center al-center"
                     onClick={() => getMyPost(getUser._id)}>My posts
                </div>
                <div className="postButton flex1 d-flex j-center al-center"
                     onClick={() => getMyTopics(getUser._id)}>My topics
                </div>
            </div>
            <div>
                {getMyInfo.postId ?
                    getMyInfo.map((replies, ind) =>
                        <Replies replies={replies}/>)
                    :
                    getMyInfo.map((replies, ind) =>
                        <Replies replies={replies}/>)
                }
            </div>
        </div>
    );
};

export default Profile;