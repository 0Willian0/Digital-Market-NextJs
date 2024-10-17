'use client'
import React, { useEffect } from "react";
import PageTitle from "@/components/templates/PageTitle";
import { useSearchParams } from 'next/navigation';
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { baseApiUrl } from "@/app/config/global";
import '../../../styles/HistoryProduct.css'
import HistoryItem from "./HistoryItem";
import { setUser } from "../../config/store";

interface User{
    id?:number
}

interface Product{
    id?:number
    name?:string
    price?:number
    imageUrl?:string
    dateBuyed?:Date
}

interface Price{
    totalPrice?:number
}


const HistoryProducts:React.FC = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state:{app:{user:User}})=>state.app.user)
    const [products, setProducts] = useState<Product[]>([])
    const [price, setPrice] = useState<Price>({totalPrice:0})
    // Dentro do seu componente
    const searchParams = useSearchParams();
    const dateBuyedEncoded = searchParams.get('dateBuyed');

    let dateBuyed: string = "Data não encontrada";

    // Decodificando e formatando a data
    if (dateBuyedEncoded) {
        // Decodificando a data recebida
        const decodedDate = decodeURIComponent(dateBuyedEncoded);
        const parts = decodedDate.split('/'); // Espera-se que a data chegue no formato dd/mm/yyyy

        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            dateBuyed = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`; // Monta a string da data
        } else {
            dateBuyed = "Data inválida";
        }
    }

    // Agora você pode usar dateBuyed no seu JSX

    const loadUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    };
    const getProducts= ()=>{
        const url = `${baseApiUrl}/history`
        console.log(dateBuyed)
        axios.get(url,{ params:{ dateBuyed: dateBuyed,
                                 userId: user.id
        }}).then(res=>{
            setProducts(res.data)
        })
    }

    const getTotalPrice = ()=>{
        const url = `${baseApiUrl}/historyProducts`
        axios.get(url,{params:{ dateBuyed: dateBuyed,
                                 userId: user.id
        }}).then(res=>{
            setPrice(res.data)
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
        if(user?.id){
            getProducts()
            getTotalPrice()
        }
        
    },[dateBuyed,user])


    return(
        <div className="history-products">
            <PageTitle icon="fa fa-history" main={dateBuyed ?? "Data não encontrada"}/>
            <ul>
            {products.map(product => (
                <li key={product.id}><HistoryItem product={product}/></li>
            ))}
            </ul>
            <h2>
                Total Gasto: R${price.totalPrice?.toFixed(2) ?? "0.00"}
            </h2>
        </div>
    )
}

export default HistoryProducts