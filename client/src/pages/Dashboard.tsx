import React from "react";
import WindowWrapper, { Props } from "../components/WindowWrapper";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate()


    const deleteWindow = () => {
        alert("Please don't !")
    };
    const goLogin = () => {
        navigate('/login');
    }
    const goRegister = () => {
        navigate('/register');
    }

    return (
        <p>

            <WindowWrapper visible={true} onClose={deleteWindow} title={"Welcome to my dashboard"} style={{ width: 300 }} expandF={() => {}}>
                <p style={{ display: "flex", textAlign: "right", justifyContent: "center" }}>
                    <button className="" style={{ margin: 20 }} type="submit" onClick={goRegister}>
                        Register
                    </button>
                    <button className="" style={{ margin: 20 }} type="submit" onClick={goLogin}>
                        Login
                    </button>
                </p>

            </WindowWrapper>
        </p>
    )
}
export default Dashboard