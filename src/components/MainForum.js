import React, {useContext, useEffect} from 'react';
import http from "../plugins/http";
import Topic from "./Topic";
import MyContext from "../context/MyContext";



const MainForum = () => {

    const {getTopics, setTopics} = useContext(MyContext)

    useEffect(() => {
        http.get("allPosts").then(res => {
            if (res.success) {
                setTopics(res.allPosts)
            }
        })
    }, [])

    return (
        <div className="mainForumField d-flex f-column-rev al-center j-center">
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