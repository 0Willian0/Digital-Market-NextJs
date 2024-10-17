'use client'
import React, {useEffect, useState} from "react";
import PageTitle from "../../components/templates/PageTitle";
import CartItem from "./CartItem";
import axios from 'axios'
import { baseApiUrl } from "../config/global";
import { useSelector, useDispatch } from "react-redux";
import '../../styles/Cart.css'
import { notifySuccess, notifyError } from "../config/msgs";
import { setUser } from "../config/store";

interface User{
    id?:number
    balance?:number
}

interface Price{
    totalPrice?:number
}

interface Product{
    id?:number
}

const Cart:React.FC = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state: {app:{user:User}}) => state.app.user);
    const [products, setProducts] = useState<Product[]>([])
    const [users, setUsers] = useState<User>({})
    const [price, setPrice] = useState<Price>({})

    const loadUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    };

    const getProducts = async()=>{
        const url = `${baseApiUrl}/cart/${user.id}`
        const res = await axios.get(url)
        setProducts(res.data)          
    }

    const getUser = ()=> {
        const url = `${baseApiUrl}/users/${user.id}`
        axios(url).then(res=>{
            setUsers(res.data)
        })
    }

    const getTotalPrice = ()=>{
        const url = `${baseApiUrl}/cartPrice/${user.id}`
        axios(url).then(res=>{
            setPrice(res.data)
            if(price.totalPrice == null)
                price.totalPrice = 0
        })
    }

    const pay = async () => {

        if(!users.balance)return
        if(!price.totalPrice)return
        
        if (users.balance> price.totalPrice) {
            try {
                // Atualizar saldo do usuário
                const newBalance = users.balance - price.totalPrice;
                const urlPut = `${baseApiUrl}/cartPrice/${user.id}`;
                const urlDelete = `${baseApiUrl}/cart/${user.id}`;
                const urlGet = `${baseApiUrl}/cartHistory/${user.id}`;
                const urlPostHistory = `${baseApiUrl}/history`;
    
                // Atualiza o saldo do usuário
                await axios.put(urlPut, { balance: newBalance });
    
                // Obtém o histórico do carrinho
                const response = await axios.get(urlGet);
                const cartHistoryData = response.data;  // Usando diretamente os dados da resposta
    
                // Insere no histórico de compras
                await axios.post(urlPostHistory, cartHistoryData);
    
                // Deleta o carrinho após a compra
                await axios.delete(urlDelete);
    
                // Notifica o sucesso
                notifySuccess();
    
            } catch (error) {
                console.error("Erro durante o pagamento:", error);
                notifyError();
            }
        } else {
            notifyError();
        }
    };

    useEffect(() => {
        if (!user?.id) {
            loadUserFromLocalStorage();
        } else {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(()=>{
        if (user?.id) {
        getProducts()
        getUser()
        getTotalPrice()
        }
    },[user])

    return(
        <div className="cart">
            <PageTitle icon="fa fa-shopping-cart"
            main="Carrinho"/>
            <ul>
            {products.map(product => (
                <li key={product.id}><CartItem product={product}/></li>
            ))}
            </ul>
            {products.length == 0 ?(<h3>
            Carrinho Vazio!
            </h3>):
            (<>
                <h4>
                    Preco Total: R${price.totalPrice}
                </h4>
                <button className="btn btn-success" onClick={pay}>
                    Pagar
                </button>
            </>
        )}
        </div>
    );
}

export default Cart