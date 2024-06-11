import React, { Component, SyntheticEvent, useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import WindowWrapper, { Props } from "../../components/WindowWrapper";
import { title } from "process";
import axios from "axios";

export interface Propss {
    id: number
}

const CatUpdate = ({ id }: Propss) => {
    const [val, setVal] = useState("1337");
    const [titleI, updateTitle] = useState("1337");
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("Updating this  : ", {
            title: titleI,
            type : "cat",
            refresh: Number(val)})
        const res = await axios.put("cat/" + id, {
            title: titleI,
            type : "cat",
            refresh: Number(val),
        });
    };
    return (
        <p>
            <form onSubmit={submit}>
                <div className="field-row-stacked">
                    <label htmlFor="floatingInput" style={{ left: 0 }}>Title</label>
                    <input type="text" className="form-control" id="floatingPassword" onChange={(e) => (updateTitle(e.target.value))} />
                </div>
                <div className="field-row-stacked" style={{ height: 70 }}>
                    <label htmlFor="floatingInput">Refresh rate (ms)</label>
                    <input id="text24" type="number" pattern="[0-9]*" value={val} onChange={(e) => setVal((v) => (e.target.validity.valid ? (Math.max(0, Math.min(100000, Number(e.target.value))).toString()) : v)) } />
                </div>
                <button className="" style={{ margin: 20 }} type="submit" onClick={submit}>
                    Update
                </button>
            </form>
        </p>
    )
}


const meow = [
    "Nom nom nom", "Purrfect", "Meowtilda", "Smoochie Poochie", "Mewment", "Purr-fectly happy", "Hiss-terical", "Cat-atonic", "Mew-sical", "Fur-ever alone"
];
const Cat = ({ visible, onClose, title, id }: Props) => {

    const [image, setImage] = useState("");
    const [refresh, setRefresh] = useState(1337);

    const [expand, setExpand] = useState("none")
    async function expandF() {
        if (expand == "none")
            setExpand("")
        else
            setExpand("none")
    }

    async function getCatImage() {
        const url = "cat/" + id + "/get"
        const res = await axios.get(url);
        if (res.data === "")
            return
        console.log("REFRESH : ", res.data.refresh)
        setRefresh(Number(res.data.refresh))
        setImage(res.data.url)
    }


    useEffect(() => {
        getCatImage();
        const interval = setInterval(() => {
            getCatImage();
        }, refresh);

        return () => clearInterval(interval);
    }, [refresh]);

    async function deleteCat() {
        const url = "cat/" + id + ""
        const res = await axios.delete(url);
    }



    const deleteWindow = () => {
        deleteCat()
        onClose()
    };


    const test = (
        <WindowWrapper visible={visible} onClose={deleteWindow} title={title} style={{ width: 600 }} expandF={expandF}>
            <div className="window-body">
                <p>
                    <img src={image} title={meow[Math.floor(Math.random() * meow.length)]} alt="Trop CHoupi" style={{ maxWidth: "300px", maxHeight: "300px" }} />
                </p>
                <p style={{ display: expand }}>
                    <CatUpdate id={id} />
                </p>
            </div>
        </WindowWrapper>
    )
    return test
}
export default Cat