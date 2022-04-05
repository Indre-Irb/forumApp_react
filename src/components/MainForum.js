import React, {useState, useContext, useEffect} from 'react';
import http from "../plugins/http";
import Topic from "./Topic";
import MyContext from "../context/MyContext";
import Loader from "./Loader";


const MainForum = () => {

    const {getTopics, setTopics} = useContext(MyContext)
    const [getLoader, setLoader] = useState(true)


    useEffect(() => {
        http.get("allPosts").then(res => {
            if (res.success) {
                setLoader(false)
                setTopics(res.allPosts)
            }
        })
    }, [])

    return (
        <div className="mainForumField d-flex f-column-rev al-center j-center">
            {getLoader && <Loader/>}
            {getTopics.length > 0 &&
                getTopics.map((topic, ind) => <Topic topic={topic} key={ind}/>
                )}
            <div className="d-flex topicHeader al-center j-center ">
                <div className="flex1 d-flex al-center j-center">Add to favorite</div>
                <div className="flex6 d-flex ">
                    <div className="flex4 d-flex al-center">Forum Topic</div>
                    <div className="flex1 d-flex al-center j-center">Posted by</div>
                    <div className="flex1 d-flex al-center j-center">Replies</div>
                    <div className="flex2 d-flex al-center j-center">Publishing date</div>
                </div>
            </div>

        </div>
    );
};

export default MainForum;