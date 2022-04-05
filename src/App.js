import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MyContext from "./context/MyContext";
import React, {useState, useEffect} from "react";
import Toolbar from "./components/Toolbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import OneTopicPage from "./pages/OneTopicPage";
import NotificationBadge from "./components/NotificationBadge";
import TopicModal from "./components/TopicModal";
import FavoritesPage from "./pages/FavoritesPage";


function App() {

    const [getUser, setUser] = useState(null)
    const [getTopicModal, setTopicModal] = useState(false)
    const [getChangePhoto, setChangePhoto] = useState(false)
    const [getNotification, setNotification] = useState(false)
    const [getNotificationInfo, setNotificationInfo] = useState([])
    const [getTopics, setTopics] = useState([])
    const [getActivePage, setActivePage] = useState(1);
    const [getFavorite, setFavorite] = useState([])


    useEffect(() => {

    }, [getNotification])

    return (
        <div className="App">
            <MyContext.Provider value={{
                getUser,
                setUser,
                getTopicModal,
                setTopicModal,
                getActivePage,
                setActivePage,
                getNotification,
                setNotification,
                getNotificationInfo,
                setNotificationInfo, getFavorite, setFavorite,
                getChangePhoto, setChangePhoto, getTopics, setTopics
            }}>
                <BrowserRouter>
                    <Toolbar/>
                    {getTopicModal && <TopicModal/>}
                    <Routes>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/main' element={<MainPage/>}/>
                        <Route path='/main/:id' element={<OneTopicPage/>}/>
                        <Route path='/favorites' element={<FavoritesPage/>}/>
                    </Routes>
                </BrowserRouter>
            </MyContext.Provider>
        </div>
    );
}

export default App;
