import React from "react";
import Link from "next/link";
import '../../styles/UserCart.css'

const UserCart = ()=>{
    
    return(
        <div className="user-cart">
            <Link className="fa fa-shopping-cart" href='/cart'> Carrinho</Link>
        </div>
    )
}

export default UserCart