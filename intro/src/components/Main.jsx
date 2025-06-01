import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const [topSales, setTopSales] = useState([]);
    const [isLoadingTopSales, setIsLoadingTopSales] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
    const [catalogItems, setCatalogItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [offset, setOffset] = useState(0);
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

    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/categories`)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки категорий');
                return response.json();
            })
            .then(data => {
                setCategories([{ id: 0, title: "Все" }, ...data]);
                setSelectedCategory(0);
            })
            .catch(err => {
                history('*');
                setIsLoadingCatalog(false);
            });
    }, []);

    useEffect(() => {
        if (selectedCategory === 0) {
            fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/items?offset=${offset}`)
                .then(response => {
                    setIsLoadingCatalog(true);
                    if (!response.ok) throw new Error('Ошибка загрузки товаров');
                    return response.json();
                })
                .then(data => {
                    setCatalogItems(prev => [...prev, ...data]);
                    setHasMoreItems(data.length >= 6);
                    setIsLoadingCatalog(false);
                })
                .catch(err => {
                    history('*');
                    setIsLoadingCatalog(false);
                });
        } else {
            fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/items?categoryId=${selectedCategory}&offset=${offset}`)
                .then(response => {
                    setIsLoadingCatalog(true);
                    if (!response.ok) throw new Error('Ошибка загрузки товаров');
                    return response.json();
                })
                .then(data => {
                    setCatalogItems(prev => [...prev, ...data]);
                    setHasMoreItems(data.length >= 6);
                    setIsLoadingCatalog(false);
                })
                .catch(err => {
                    history('*');
                    setIsLoadingCatalog(false);
                });
        }
    }, [selectedCategory, offset]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setOffset(0);
        setCatalogItems([]);
        setHasMoreItems(true);
    };

    const loadMoreItems = () => {
        setOffset(prev => prev + 6);
    };

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
                    <section className="catalog">
                        <h2 className="text-center">Каталог</h2>
                        {isLoadingCatalog ? (
                            <div className="preloader">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        ) :
                            (<>
                                <ul className="catalog-categories nav justify-content-center">
                                    {categories.map(category => (
                                        <li className="nav-item" key={category.id} >
                                            <a
                                                className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCategoryClick(category.id);
                                                }}
                                            >
                                                {category.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="row">
                                    {catalogItems.map((item, index) => (
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
                                <div className="text-center">
                                    {hasMoreItems &&
                                        <button className="btn btn-outline-primary" onClick={loadMoreItems}>Загрузить ещё</button>
                                    }
                                </div>
                            </>
                            )}
                    </section>
                </div>
            </div >
        </main >
    );
}

export default Main
