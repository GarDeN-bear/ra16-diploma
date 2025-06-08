import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Catalog from "./Catalog.jsx";

const Main = () => {
    const [topSales, setTopSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/top-sales`)
            .then(response => {
                setIsLoading(true);
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                setTopSales(data);
                setIsLoading(false);
            })
            .catch(err => {
                history('*');
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {topSales.length > 0 && <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {isLoading ? (<div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>) : (
                    <div className="row">
                        {topSales.map((item, index) => (
                            <div className="col-4" key={index}>
                                <div className="card">
                                    <img src={item.images[0]}
                                        className="card-img-top img-fluid" alt={item.title} />
                                    <div className="card-body">
                                        <p className="card-text">{item.title}</p>
                                        <p className="card-text">{item.price} руб.</p>
                                        <Link to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">Заказать</Link>                                     </div>
                                </div>
                            </div>))
                        }
                    </div>
                )}
            </section>}
            <Catalog isMainFrame={true} />
        </>
    );
}

export default Main
