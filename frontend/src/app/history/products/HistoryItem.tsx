import React from "react";
import '../../../styles/HistoryItem.css'

interface Product{
    name?:string
    price?:number
    imageUrl?:string
    dateBuyed?:Date
}

interface ProductProps{
    product?:Product
}

const HistoryItem:React.FC<ProductProps> = ({product})=>{

    const formatTime = (dateBuyed: Date | string | undefined)=> {
        if (!dateBuyed) return '';  // Caso a data seja nula ou indefinida
        const date = new Date(dateBuyed);  // Converter o timestamp em um objeto Date
        // Converter para o horário de Brasília (GMT-3) e retornar apenas a hora
        return date.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    }

    return(
        <div className="history-item">
            {product &&(
                <>
            <div className="product-item-image d-none d-sm-block">
            {product.imageUrl ? (
                <img src={product.imageUrl} height="150" width="150" alt="Product" />
            ) : (
                <img src="/assets/product.png" height="150" width="150" alt="Product" />
            )}
            </div>
            <div className="product-item-info">
                <h2>{product.name}</h2>
                <p>R${product.price}</p>
                <p>Horario: {formatTime(product.dateBuyed)}</p>
            </div>
            </>
        )}
            
        </div>
    )
}

export default HistoryItem