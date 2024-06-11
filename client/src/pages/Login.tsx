import React, { Component, SyntheticEvent } from "react";
import "../Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    let password = ""
    let mail = ""

    const updatePwd = (d: string) => { password = d }
    const updateEmail = (d: string) => { mail = d }
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await axios.post("login", {
            email: mail,
            password: password,
        });
        goHome()
    };

    const goHome = () => {
        navigate('/home');
    }
    const goRegister = () => {
        navigate('/register');
    }

    return (
        <div className="background" style={{ backgroundColor: "black" }}>
            <div className="window" style={{ width: 400, height: "auto", position: "absolute", left: 0, right: 0, margin: "auto" }}>
                <div className="title-bar">
                    <div className="title-bar-text">Login</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body">
                    <p>
                        <form onSubmit={submit}>
                            <div className="field-row-stacked" style={{ height: 70 }}>
                                <label htmlFor="floatingInput">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    onChange={(e) => updateEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div className="field-row-stacked">
                                <label htmlFor="floatingPassword" style={{ left: 0 }}>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    onChange={(e) => (updatePwd(e.target.value))}
                                />
                            </div>
                            <button className="" style={{ margin: 20 }} type="submit">
                                Login
                            </button>
                            <div>
                                <label style={{ textDecoration:"underline", cursor:"pointer" }} onClick={goRegister}>Don't have an account ? Create one here</label>
                            </div>
                        </form>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Login