import React, {useContext, useEffect, useState} from 'react';
import http from "../plugins/http";
import Topic from "./Topic";

const MainForum = () => {

    const [getTopics, setTopics] = useState([])


    useEffect(() => {
        http.get("allPosts").then(res => {
            if (res.success) {
                console.log(res)
                setTopics(res.allPosts)
            }

        })

    }, [])

    return (
        <div className="mainForumField d-flex f-column-rev al-center j-center">
            {getTopics.length > 0 &&
                getTopics.map((topic, ind) => <Topic topic={topic} key={ind}/>
                )}
            <div className="d-flex topicHeader al-center j-center">
                <div className="flex1 d-flex al-center j-center">Add to favorite</div>
                <div className="flex6 d-flex">
                    <div className="flex4 d-flex al-center j-center">Forum Topic</div>
                    <div className="flex1 d-flex al-center j-center">Posted by</div>
                    <div className="flex2 d-flex al-center j-center">Topic published</div>
                </div>
            </div>
        </div>
    );
};

export default MainForum;