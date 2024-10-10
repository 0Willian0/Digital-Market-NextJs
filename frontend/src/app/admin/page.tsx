'use client'
import PageTitle from "@/components/templates/PageTitle";
import React from "react";
import { Card, Tabs, Tab } from 'react-bootstrap';
import '../../styles/AdminPages.css'
import UserAdmin from "./UserAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import ProductsAdmin from "./ProductsAdmin";


const Admin: React.FC = ()=>{
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