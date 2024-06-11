import React, { Component, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import WindowWrapper, { Props } from "../../components/WindowWrapper";



const CatInstaller = ({ visible, onClose, title}: Props) => {
    const navigate = useNavigate();
    const [val, setVal] = useState("1337");
    const [titleI, updateTitle] = useState("1337");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("Posting this  : ", {
            title: titleI,
            type : "cat",
            refresh: Number(val)})
        const res = await axios.post("cat", {
            title: titleI,
            type : "cat",
            refresh: Number(val),
        });
        goHome()
    };
    const goHome = () => {
        navigate('/home');
    }

    return (
        <WindowWrapper visible={visible} onClose={onClose} title={title} style={{}} expandF={() => {}}>
            <div className="window-body">
                <form onSubmit={submit}>
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
                            id="text24"
                            type="number"
                            pattern="[0-9]*"
                            value={val}
                            onChange={(e) =>
                              setVal((v) => (e.target.validity.valid ? (Math.max(0, Math.min(100000, Number(e.target.value))).toString()) : v))
                            }
                        />
                    </div>
                    <button className="" style={{ margin: 20 }} type="submit" onClick={submit}>
                        Create widget
                    </button>
                </form>
            </div>
        </WindowWrapper>
    );
}
export default CatInstaller
    