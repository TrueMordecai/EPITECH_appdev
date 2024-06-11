import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = () => {

    const [user, setUser] = useState(new User())
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('whoami')
                setUser(new User(data.id, data.email))
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post('logout', {})
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-white" to={"/home"}>{user.name}</Link>
                <Link className="p-2 text-white" to={"/login"}
                    onClick={logout}>Sign out</Link>
            </ul>
        </nav>
    )
}

export default Nav