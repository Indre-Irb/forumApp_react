import React, {useRef} from 'react';
import http from '../plugins/http'
import {useNavigate} from "react-router-dom";

const Register = () => {

    const nav = useNavigate()

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
        console.log(registerInfo)

       http.post(registerInfo, "register")
            .then(res => {
                if (res.success){
                    nav("/login")
                }
            })
    }


    return (
        <div className="d-flex al-center j-center">
            <div className="registerField d-flex al-center s-around f-column">
                <input type="text" ref={ref.name} placeholder="Your name"/>
                <input type="text" ref={ref.email} placeholder="Your email"/>
                <input type="text" ref={ref.pass1} placeholder="Your password"/>
                <input type="text" ref={ref.pass2} placeholder="Repeat your password"/>
                <button onClick={register}>Register</button>
            </div>
        </div>

    );
};

export default Register;