import React, {useEffect, useContext} from 'react';
import MyContext from '../context/MyContext'
import Topic from "./Topic";

const Favorites = () => {

    const {getFavorite, setFavorite} = useContext(MyContext)
    const {getTopics} = useContext(MyContext)

    useEffect(() => {

    }, [])

    return (
        <div className="d-flex al-center f-column vh-100">
            {getFavorite.length > 0 &&
                getFavorite.map(fav =>
                    getTopics.map(topic =>
                        topic._id === fav &&
                        <Topic topic={topic}/>))}
        </div>
    );
};

export default Favorites;