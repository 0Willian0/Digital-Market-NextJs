import React, { useState,useEffect } from "react";
import {baseApiUrl} from '../config/global'
import axios from "axios";
import '../../styles/ProductByCategory.css'
import ProductItem from "../product/ProductItem";

interface Products{
    id?:number
}

const AllProducts:React.FC = ()=>{
    const [products, setProducts] = useState<Products[]>([])

    const getProducts = async()=>{
        const url = `${baseApiUrl}/allproducts`
        const res = await axios.get(url)
        setProducts(res.data.data || res.data)
    }

    useEffect(() => {
          getProducts()
      },[]);


    return(
        <div className="products-by-category">
            <ul>
            {products.map(product => (
                <li key={product.id}><ProductItem product={product}/></li>
            ))}
            </ul>
        </div>
    );
}

export default AllProducts