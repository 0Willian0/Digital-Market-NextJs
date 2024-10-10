import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { baseApiUrl } from "../../app/config/global";
import axios from 'axios'
import '../../styles/UserBalance.css'

interface User{
    id?:number
    balance?:number
}

const UserBalance:React.FC = ()=>{
    const [users,setUsers] = useState<User>({})
    const user = useSelector((state:{app:{user:User}}) => state.app.user)

    const getBalance = ()=>{
        const url = `${baseApiUrl}/users/${user.id}`
        axios.get(url).then(res=>{
            setUsers(res.data)
        })
    }

    useEffect(()=>{
        getBalance()
    },[])
    
    return(
        <div className="user-balance">
            <span className="d-none d-sm-block fa fa-money fa-lg"> {users.balance}</span>
        </div>
    )
}

export default UserBalance