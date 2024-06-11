import React, { Component, SyntheticEvent, useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import WindowWrapper, { Props } from "../../components/WindowWrapper";





const Help = ({ visible, onClose }: Props) => {
    const test = (
        <WindowWrapper visible={visible} onClose={onClose} title="Help" style={{}} expandF={() => {}}>
            <div className="window-body">
                <p>
                    Welcome to the dashboard user, click on the add_widget.exe to create a new widget. Each time you install a new widget, you must reboot the pc !
                </p>
            </div>
        </WindowWrapper>
    )
    return test
}
export default Help