import axios from "axios";
import { exit } from "process";
import React, { Children, Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Nav from "./Nav";

const Wrapper = (props: any) => {

    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await axios.get('whoami')
                } catch (e) {
                    setRedirect(true)
                }
            }
        )()
    }, [])

    if (redirect) {
        navigate('/login')
        return (<></>)
    }
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}
export default Wrapper