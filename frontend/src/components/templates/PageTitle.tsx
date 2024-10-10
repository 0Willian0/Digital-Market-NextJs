import React from "react";
import '../../styles/PageTitle.css'

interface PageTitleProps{
    icon: string,
    main: string
}

const PageTitle: React.FC<PageTitleProps> = ({icon, main})=>{
    return(
        <div className="page-title">
            <h1>{icon && <i className={`${icon}`}></i>} {main}</h1>
        </div>
    )
}

export default PageTitle