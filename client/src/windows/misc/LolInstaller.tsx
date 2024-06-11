import React, { Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import WindowWrapper, { Props } from "../../components/WindowWrapper";
import './style.css'


const LoLInstaller = ({ visible, onClose, title }: Props) => {
    const [radio, setRadio] = useState("rank")
    const handleRadioChangeProfile = (event: any) => { setRadio("profile"); };
    const handleRadioChangeRank = (event: any) => { setRadio("rank"); };
    const text = "Welcome to the League installation wizard. We're glad you've chosen League as your Widget provider system. Before you begin, please read the following information carefully to ensure a successful installation.\nSystem Requirements:\n--------------------\nMake sure your computer meets the minimum system requirements for League. You can find the system requirements for your version of Windows on the League website or in your product documentation. If your computer does not meet the minimum requirements, you may experience performance issues or installation errors.\nBack Up Your Data:\n-------------------\nBefore you begin the installation, make sure to back up all important data on your computer. This includes documents, pictures, music, cats, and any other files you don't want to lose. While the installation process should not erase your data, it's always better to be safe than sorry.\nInstallation Options:\n---------------------\nDuring the installation process, you will be prompted to make a few choices. For example, you will need to select your time zone, create a user account, and provide your product key. Make sure to have this information handy before you begin the installation. You can usually find your product key on the packaging of your League product, or in an email if you purchased a digital copy.\nInstallation Time:\n------------------\nPlease be patient while the installation process completes. The time it takes to install Windows will depend on your computer's performance and the options you selected during the installation process. Some installations may take several hours to complete. Make sure to allow enough time for the installation to finish without interruption.\nSupport and Resources:\n-----------------------\nIf you experience any issues during the installation process, please refer to the troubleshooting section of your product documentation, or visit the RiotGame support website for assistance. There are also many online forums and communities where you can ask for help and advice from other League users.\nThank you for choosing League. We hope you enjoy your new operating system!";
    const bg = require('../../image/kata.webp');
    const navigate = useNavigate();

    const [titleI, updateTitle] = useState("title")
    const [username, updateUsername] = useState("CrossBiwBoyExoPa")
    const [val, setVal] = useState("1337");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let u = ""
        if (radio == "rank")
            u = "empty"
        else
            u = username
        console.log(titleI, radio, u, val)
        const res = await axios.post("league", {
            title: titleI,
            type: radio,
            username: u,
            refresh: Number(val),
        });
        goHome()
    };
    const goHome = () => {
        navigate('/home');
    }

    return (
        <WindowWrapper visible={visible} onClose={onClose} title={title} style={{ width: 700 }} expandF={() => {}}>
            <div className="window-body" style={{}}>
                <div className="container">
                    <div className="bg"><img src={bg} /></div>
                    <div className="Normal element" style={{}}>
                        <label style={{ width: "100%", fontSize: 15, fontWeight: "900", maxHeight: 10, paddingBottom: 30 }}>Install Official League of Legend Widget</label>
                        <textarea readOnly id="text20" style={{ resize: "none", height: 230 }} value={text}></textarea>
                    </div>

                    <form className="Other element" onSubmit={submit} style={{}}>
                        <div className="field-row-stacked">
                            <label htmlFor="floatingInput" style={{ left: 0 }}>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingPassword"
                                onChange={(e) => (updateTitle(e.target.value))}
                            />
                        </div>
                        <div className="field-row-stacked" style={{ height: 70 }}>
                            <label htmlFor="floatingInput">Refresh rate (ms)</label>
                            <input
                                value={val}
                                type="number"
                                pattern="[0-9]*"
                                className="form-control"
                                onChange={(e) =>
                                    setVal((v) => (e.target.validity.valid ? (Math.max(0, Math.min(100000, Number(e.target.value))).toString()) : v))
                                  }
                            />
                        </div>
                        <div className="Other" style={{}}>
                            <fieldset>
                                <div className="field-row" style={{}}>
                                    Select one:
                                </div>
                                <div className="field-row" onClick={handleRadioChangeRank} style={{ width: 100 }}>
                                    <input id="radio11" type="radio" name="fieldset-example" checked={radio === "rank"} onChange={(e) => e} />
                                    <label>Get Rank One</label>
                                </div>
                                <div className="field-row" onClick={handleRadioChangeProfile} style={{ width: 70 }}>
                                    <input id="radio10" type="radio" name="fieldset-example" checked={radio === "profile"} onChange={(e) => e} />
                                    <label>Profile</label>
                                </div>
                                <div className="field-row-stacked">
                                    <input
                                        type="text"
                                        disabled={radio == "rank"}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder={'username'}
                                        onChange={(g) => (updateUsername(g.target.value))}
                                    />
                                </div>
                            </fieldset>
                        </div>
                        <button className="" style={{ margin: 20 }} type="submit" onClick={submit}>
                            Create widget
                        </button>
                    </form>
                </div>
            </div>
        </WindowWrapper>
    );
}
export default LoLInstaller