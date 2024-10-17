import React from "react";
import '../../styles/HistoryData.css'
import Link from "next/link";

interface History{
    dateBuyed?:Date
}

interface HistoryProps{
    history?:History
}

const HistoryData:React.FC<HistoryProps> = ({history})=>{

    return(
        <div className="history-data">
            <div className="history-item-info">
            {history?.dateBuyed ? (
                <Link
                href={{
                    pathname: "/history/products",
                    query: {
                        dateBuyed: encodeURIComponent(new Date(history.dateBuyed).toLocaleDateString()),
                      },
                }}>
                    <h2>{new Date(history.dateBuyed).toLocaleDateString()}</h2>
                </Link>
                ) : (
                    <p>Nenhuma Data!</p>
                )}
            </div>
        </div>
    )
}

export default HistoryData