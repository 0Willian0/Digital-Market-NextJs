'use client'
import PageTitle from "@/components/templates/PageTitle";
import { Card, Tabs, Tab } from 'react-bootstrap';
import '../../styles/AdminPages.css'
import UserAdmin from "./UserAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import ProductsAdmin from "./ProductsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../config/store";
import React, { useEffect } from "react";

interface User{
    id?:number
}

const Admin: React.FC = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state: {app:{user:User}}) => state.app.user);
    const loadUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    };

    useEffect(() => {
        if (!user?.id) {
            loadUserFromLocalStorage();
        } else {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return(
            <div className="admin-pages">
            <PageTitle icon="fa fa-cogs" main="Administração do Sistema"/>
            <div className="admin-pages-tabs">
            <Card>
                <Card.Body>
                    <Tabs defaultActiveKey="product" id="card-tabs" className="mb-3">
                        <Tab eventKey="product" title="Produto">
                        <div className="p-3">
                            <ProductsAdmin/>
                        </div>
                        </Tab>
                        <Tab eventKey="category" title="Categoria" >
                        <div className="p-3">
                            <CategoriesAdmin/>
                        </div>
                        </Tab>
                        <Tab eventKey="user" title="Usuario">
                        <div className="p-3">
                            <UserAdmin/>
                        </div>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </div>
            </div>
    )
}

export default Admin