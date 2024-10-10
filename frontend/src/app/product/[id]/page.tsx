'use client'
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/templates/PageTitle";
import { baseApiUrl } from "../../config/global";
import axios from "axios";
import '../../../styles/ProductByCategory.css'
import ProductItem from '../ProductItem';
import { useParams } from "next/navigation";

interface Product {
    id: number;
    name: string;
    price: string;
    imageUrl?: string;
}

interface Category {
    name?: string;
}

const ProductByCategory: React.FC = () => {
    const { id } = useParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category>({});
    const [loading, setLoading] = useState(true);  // Estado de carregamento

    const getCategory = async () => {
        try {
            const url = `${baseApiUrl}/categories/${id}`;
            const res = await axios.get(url);
            setCategory(res.data.categories || res.data);
        } catch (error) {
            console.error('Erro ao carregar categoria:', error);
        }
    };

    const getProducts = async () => {
        try {
            const url = `${baseApiUrl}/categories/${id}/products`;
            const res = await axios.get(url);
            setProducts(res.data.data || res.data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);  // Finaliza o estado de carregamento
        }
    };

    useEffect(() => {
        if (id) {
            setLoading(true);  // Inicia o estado de carregamento
            getCategory();
            getProducts();
        }
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;  // Exibe um estado de carregamento
    }

    return (
        <div className="products-by-category">
            <PageTitle icon="fa fa-folder-o" main={category.name ?? "Categoria não encontrada"} />
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}><ProductItem product={product} /></li>
                    ))
                ) : (
                    <li>Nenhum produto encontrado.</li>
                )}
            </ul>
        </div>
    );
};

export default ProductByCategory;
