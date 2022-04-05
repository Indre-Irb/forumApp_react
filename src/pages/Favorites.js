import React, {useEffect, useContext} from 'react';
import MyContext from '../context/MyContext'

const Favorites = () => {

    const favoriteList = JSON.parse(localStorage.getItem("MyFavorites") || "0");
    const {getFavorite, setFavorite} = useContext(MyContext)

    useEffect(() => {
        if (favoriteList !== 0) {
            setFavorite([...favoriteList])
        }
    }, [getFavorite])

    return (
        <div>
            {getFavorite.length > 0 ?
                getFavorite.map(fav =>
                    <div>
                    </div>)
                :
                <div>Favorite list is empty</div>
            }
        </div>
    );
};

export default Favorites;