import Link from "next/link";
import React from "react";
import '../../styles/UserDropdown.css'
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/app/config/store";
import { userKey } from "@/app/config/global";

interface User{
    name?:string
    imageUrl?:string
}

const UserDropdown: React.FC = ()=>{
    const user = useSelector((state: {app: {user:User}})=>state.app.user);
    const dispatch = useDispatch()

    const logout = ()=>{
        localStorage.removeItem(userKey)
        dispatch(setUser(null))
    }
    return(
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">{user.name}</span>
                {user.imageUrl ?(
                    <div className="user-dropdown-img">
                        <img src={user.imageUrl} alt="user" />
                    </div>
                ):(
                    <div className="user-dropdown-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYd-6qQ2Q7lfBzwqf49GUlu0oe1m8EjA5fA&s" alt="user" />
                    </div>
                )}
                
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                <Link href="/admin"><i className="fa fa-cogs"> Administração</i></Link>
                <Link onClick={logout} href="/auth"><i className="fa fa-sign-out"> Sair</i></Link>
            </div>
        </div>
    )
}

export default UserDropdown