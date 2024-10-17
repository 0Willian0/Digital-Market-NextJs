'use client'
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/templates/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { baseApiUrl } from "../config/global";
import axios from "axios";
import HistoryData from "./HistoryData";
import '../../styles/History.css'
import { setUser } from "../config/store";

interface User{
    id?:number
}

interface History{
    id?:number
    dateBuyed?:Date
}

const History = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state:{app:{user:User}})=>state.app.user)
    const [histories, setHisories] = useState<History[]>([])

    const loadUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    };

    const getHistory = ()=>{
        const url = `${baseApiUrl}/history/${user.id}`
       axios(url).then(res=>{
            setHisories(res.data)
       })
   }

   useEffect(() => {
        if (!user?.id) {
            loadUserFromLocalStorage();
        } else {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

   useEffect(()=>{
    if (user?.id) {
        getHistory()
    }
   },[user])

    return(
        <div className="history">
            <PageTitle icon="fa fa-history" main="Histórico"/>
            <ul>
            {histories.map(history => (
                <li key={history.id}><HistoryData history={history}/></li>
            ))}
            </ul> 
        </div>
    )
}

export default History