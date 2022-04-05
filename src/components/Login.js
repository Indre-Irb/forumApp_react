import React, {useContext, useRef, useState} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";
import MyContext from '../context/MyContext'

const Login = () => {

    const email = useRef()
    const pass = useRef()

    const nav = useNavigate()
    const {setUser} = useContext(MyContext)
    const [getMessage, setMessage] = useState("")

    function login() {
        const loginInfo = {
            email: email.current.value,
            pass: pass.current.value
        }

        http.post(loginInfo, "login").then(res => {
            if(res.success){
                setUser(res.checkUser)
                nav("/main")
            } else {
                setMessage(res.message)
            }
        } )
    }

    return (
            <div className="d-flex al-center j-center vh-100">

                <div className="loginField d-flex al-center s-around f-column">
                    {getMessage && <div style={{color:`#2d4659` }}>{getMessage}</div> }
                    <input type="text" ref={email} placeholder="Your email"/>
                    <input type="password" ref={pass} placeholder="Your password"/>
                    <button onClick={login}>Login</button>
                </div>
            </div>
    );
};

export default Login;