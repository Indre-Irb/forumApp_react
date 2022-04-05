import React, {useContext, useRef} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";
import MyContext from '../context/MyContext'

const Login = () => {

    const email = useRef()
    const pass = useRef()

    const nav = useNavigate()
    const {setUser} = useContext(MyContext)

    function login() {
        const loginInfo = {
            email: email.current.value,
            pass: pass.current.value
        }

        http.post(loginInfo, "login").then(res => {
            if(res.success){
                setUser(res.checkUser)
                nav("/main")
            }
        } )
    }

    return (
        <div className="d-flex al-center j-center">
            <div className="loginField d-flex al-center s-around f-column">
                <input type="text" ref={email} placeholder="Your email"/>
                <input type="text" ref={pass} placeholder="Your password"/>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;