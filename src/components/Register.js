import React, { useRef, useState} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";

const Register = () => {

    const nav = useNavigate()
    const [getMessage, setMessage] = useState("")

    const ref = {
        name: useRef(),
        email: useRef(),
        pass1: useRef(),
        pass2: useRef()
    }

    function register() {
        const registerInfo = {
            name: ref.name.current.value,
            email: ref.email.current.value,
            pass1: ref.pass1.current.value,
            pass2: ref.pass2.current.value
        }

       http.post(registerInfo, "register")
            .then(res => {
                if (res.success){
                    nav("/login")
                } else {
                    setMessage(res.message)
                }
            })
    }


    return (
        <div className="d-flex al-center j-center vh-100">
            <div className="registerField d-flex al-center s-around f-column">
                {getMessage && <div style={{color:`#2d4659` }}>{getMessage}</div> }
                <input type="text" ref={ref.name} placeholder="Your name"/>
                <input type="text" ref={ref.email} placeholder="Your email"/>
                <input type="password" ref={ref.pass1} placeholder="Your password"/>
                <input type="password" ref={ref.pass2} placeholder="Repeat your password"/>
                <button onClick={register}>Register</button>
            </div>
        </div>

    );
};

export default Register;