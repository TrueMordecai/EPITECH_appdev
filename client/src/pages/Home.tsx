import React, { useEffect, useState } from "react";
import "../Login.css";
import Help from "../windows/misc/Help";
import CatInstaller from "../windows/misc/CatInstaller";
import axios from "axios";
import Cat from "../windows/widgets/cat";
import LoLInstaller from "../windows/misc/LolInstaller";    
import LeagueProfile from "../windows/widgets/LeagueProfile";
import LeagueRankOne from "../windows/widgets/LeagueRankOne";

const modals = {
    "cat_installer": CatInstaller,
    "help": Help,
    "cat" : Cat,
    "league_profile" : LeagueProfile,
    "league_rank" : LeagueRankOne,
    "lol_installer": LoLInstaller
};

interface Win {
    id: number;
    type: keyof typeof modals;
    title: string;
    visible: boolean;
    wid: number;
}


const Home = () => {
    const logo = require('../image/lol.jpg');
    const [windows, setWindows] = useState<Win[]>([]);

    async function loadCatWidgets() {
        const res = await axios.get("users/widgets");
        for (var i = 0; i < res.data[0].length; i++) {
            openWindow(res.data[0][i].title, "cat", res.data[0][i].id)
        }
    }

    async function loadLeagueWidgets() {
        const res = await axios.get("users/widgets");
        for (var i = 0; i < res.data[1].length; i++) {
            console.log(res.data[1][i])
            openWindow(res.data[1][i].title, res.data[1][i].window, res.data[1][i].id)
        }
    }

    useEffect(() => {
        loadCatWidgets()
        loadLeagueWidgets()
    }, []);

    const openWindow = (title: string, type: any, wid : number) => {
        setWindows((prevWindows) => [
            ...prevWindows,
            { id: prevWindows.length, title, type, visible: true, wid },
        ]);
    };

    const closeWindow = (index: number) => {
        setWindows((prevWindows) =>
            prevWindows.map((windoaw, i) =>
                i === index ? { ...windoaw, visible: false } : windoaw
            )
        );
    };

    return (
        <div style={{position: "fixed"}}>
            <div
                className="icon"
                style={{ borderColor: "black", borderWidth: 1, marginTop: 0, marginLeft: 20 }}>
                <div className="image" style={{ marginBottom: 10 }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-3.png" />
                </div>
                <div className="title">
                    <span>Recycle Bin</span>
                </div>
            </div>

            <div className="icon" style={{ borderColor: "black", borderWidth: 1, marginTop: 40, marginLeft: 20 }} onClick={() => openWindow("Help", "help", -1)} >
                <div className="image" style={{ marginBottom: 10 }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/help_sheet-0.png" />
                </div>
                <div className="title">
                    <span>Help Me</span>
                </div>
            </div>

            <div className="icon" style={{ borderColor: "black", borderWidth: 1, marginTop: 40, marginLeft: 20 }} onClick={() => openWindow("Add a cat", "cat_installer", -1)}>
                <div className="image" style={{ marginBottom: 10 }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/note-2.png" />
                </div>
                <div className="title">
                    <span>add_widget.exe</span>
                </div>
            </div>
            <div
                className="icon"
                style={{ borderColor: "black", borderWidth: 1, marginTop: 40, marginLeft: 20 }} onClick={() => openWindow("League of Legend Wizard Installer", "lol_installer", -1)}>
                <div className="image" style={{ marginBottom: 10 }}>
                    <img src={logo} style={{maxHeight:48, maxWidth:48}}/>
                </div>
                <div className="title">
                    <span>lol_installer_x32.exe</span>
                </div>
            </div>

            {windows.map((windoaw, index) => {
                const Modal = modals[windoaw.type];
                return (
                    <Modal
                        key={windoaw.id}
                        title={windoaw.title}
                        visible={windoaw.visible}
                        onClose={() => closeWindow(index)}
                        id={windoaw.wid}
                    />
                );
            })}
        </div>
    );
};


export default Home