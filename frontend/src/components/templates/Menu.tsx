'use client'; 

import { useSelector} from "react-redux";
import React from "react";
import '../../styles/Menu.css'

const Menu: React.FC = ()=>{

    const isMenuVisible = useSelector((state: { app: { isMenuVisible: boolean } }) => state.app.isMenuVisible);
    return(
        <>
        {isMenuVisible && (
        <div className="menu">

        </div>
        )}
        </>
    )
}

export default Menu