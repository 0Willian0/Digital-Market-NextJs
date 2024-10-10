import PageTitle from "@/components/templates/PageTitle";
import React from "react";
import '../../styles/Home.css'
import AllProducts from "./AllProducts";

const Home: React.FC = ()=>{
    return(
            <div className="home">
            <PageTitle icon="fa fa-home" main="Pagina Inicial"/>
            <br/>
            <AllProducts/>
            </div>
    )
}

export default Home