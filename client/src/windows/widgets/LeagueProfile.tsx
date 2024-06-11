import React, { Component, SyntheticEvent, useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import WindowWrapper, { Props } from "../../components/WindowWrapper";
import { title } from "process";
import axios from "axios";

export interface Propss {
    id: number
}

const LeagueProfileUpdate = ({ id }: Propss) => {
    const [radio, setRadio] = useState("rank")
    const handleRadioChangeProfile = (event: any) => { setRadio("profile"); };
    const handleRadioChangeRank = (event: any) => { setRadio("rank"); };
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
        const res = await axios.put("league/" + id, {
            title: titleI,
            type: radio,
            username: u,
            refresh: Number(val),
        });
    };


    return (
        <p>
            <div className="">
                <form className="Other element" onSubmit={submit} style={{}}>
                    <div className="field-row-stacked" style={{ width: "97%" }}>
                        <label htmlFor="floatingInput" style={{ left: 0 }}>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            onChange={(e) => (updateTitle(e.target.value))}
                        />
                    </div>
                    <div className="field-row-stacked" style={{ height: 70, width: "97%" }}>
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
                    <button className="" style={{ margin: 20 }} type="submit" onClick={submit}> Update</button>
                </form>
            </div>
        </p>
    )
}



const LeagueProfile = ({ visible, onClose, title, id }: Props) => {

    const [icon, setIcon] = useState("");
    const [refresh, setRefresh] = useState(1337);
    const [summonerName, setSummonerName] = useState("");
    const [level, setLevel] = useState("");
    const [winrate, setWinrate] = useState("");
    const [expand, setExpand] = useState("none")
    async function expandF() {
        if (expand == "none")
            setExpand("")
        else
            setExpand("none")
    }



    async function getProfile() {
        const url = "league/" + id + "/profile"
        const { data } = await axios.get(url);
        if (data === "")
            return
        setSummonerName(data.name)
        setLevel(data.summonerLevel)
        setIcon("https://ddragon-webp.lolmath.net/latest/img/profileicon/" + data.profileIconId + ".webp")
        setRefresh(Number(data.refresh))
        setWinrate(data.win)
    }

    useEffect(() => {
        getProfile();
        const interval = setInterval(() => {
            getProfile();
        }, refresh);

        return () => clearInterval(interval);
    }, [refresh]);

    async function deleteCat() {
        const url = "league/" + id + ""
        const res = await axios.delete(url);
    }


    const deleteWindow = () => {
        deleteCat()
        onClose()
    };


    const test = (
        <WindowWrapper visible={visible} onClose={deleteWindow} title={title} style={{ width: 300 }} expandF={expandF}>
            <div>
                <div className="window-body" style={{ display: "flex" }}>
                    <div>
                        <p>
                            <img src={icon} alt="Loading..." style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        </p>
                    </div>
                    <fieldset style={{ paddingLeft: 10 }}>
                        <p style={{ marginBottom: 7, textAlign: "left" }}>
                            Username : {summonerName}
                        </p>
                        <p style={{ marginBottom: 7, textAlign: "left" }}>
                            Level : {level}
                        </p>
                        <p style={{ marginBottom: 7, textAlign: "left" }}>
                            Winrate last games : {winrate}0.0%
                        </p>
                    </fieldset>
                </div>
                <p style={{ display: expand }}>
                    <LeagueProfileUpdate id={id} />
                </p>
            </div>
        </WindowWrapper>
    )
    return test
}
export default LeagueProfile