import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import '../zindex'
import Global from "../zindex";

interface Propsa {
    visible: boolean;
    onClose: () => void;
    children: JSX.Element;
    title: string
    style: React.CSSProperties
    expandF: () => void;
}

export interface Props {
    visible: boolean;
    onClose: () => void;
    title: string
    id: number
}

const WindowWrapper = ({ visible, onClose, children, title, style, expandF }: Propsa) => {
    const ref = React.useRef<HTMLDivElement>(null)

    
    const mergeStyle = (style1 : React.CSSProperties, style2 : any) => {
        const s = {...style1, ...style2}
        return {...s, ...getIndex()}
    }

    const [stylep, api] = useSpring(() => ({ x: 0, y: 0 }))
    useDrag(({ pinching, cancel, offset: [x, y], ...rest }) => {
        api.start({ x, y })
    },
        {
            target: ref,
            drag: {
                from: () => [stylep.x.get(), stylep.y.get()]
            },
        })

    if (!visible) {
        return null;
    }
    const changeIndex = () => {
        console.log(Global.func())
    }
    const getIndex = () => {
        return {}
    } 
    return (
        <animated.div ref={ref} style={stylep}>
            <div className="window"  style={mergeStyle({ width: 400, height: "auto", position: "absolute", margin: "auto"}, style)} onClick={changeIndex}>
                <div className="title-bar">
                    <div className="title-bar-text">{title}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"  onClick={() => expandF()}></button>
                        <button aria-label="Close" onClick={() => onClose()}></button>
                    </div>
                </div>
                {children}
            </div>
        </animated.div>
    )
}
export default WindowWrapper