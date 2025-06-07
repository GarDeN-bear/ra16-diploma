import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Catalog from "./Catalog.jsx";

const Main = () => {
    const [topSales, setTopSales] = useState([]);
    const [isLoadingTopSales, setIsLoadingTopSales] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/top-sales`)
            .then(response => {
                setIsLoadingTopSales(true);
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                setTopSales(data);
                setIsLoadingTopSales(false);
            })
            .catch(err => {
                history('*');
                setIsLoadingTopSales(false);
            });
    }, []);

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <div className="banner">
                        <img src="../../img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                        <h2 className="banner-header">К весне готовы!</h2>
                    </div>

                    {topSales.length > 0 && <section className="top-sales">
                        <h2 className="text-center">Хиты продаж!</h2>
                        {isLoadingTopSales ? (<div className="preloader">
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
                                                <Link to={`/products/${item.id}.html`} className="btn btn-outline-primary">Заказать</Link>                                     </div>
                                        </div>
                                    </div>))
                                }
                            </div>
                        )}
                    </section>}
                    <Catalog isMainFrame={true} />
                </div>
            </div >
        </main >
    );
}

export default Main
