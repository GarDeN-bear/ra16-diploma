import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Catalog = ({ isMainFrame = false }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [catalogItems, setCatalogItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('q');
        if (queryParam && queryParam !== search) {
            setSearch(queryParam);
        }
    }, [location.search]);


    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/categories`)
            .then(response => {
                if (!response.ok) navigate('*');
                return response.json();
            })
            .then(data => {
                setCategories([{ id: 0, title: "Все" }, ...data]);
                setSelectedCategory(0);
            })
            .catch(err => {
                navigate('*');
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        let url = `http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/items?offset=${offset}`;
        if (selectedCategory !== 0) {
            url += `&categoryId=${selectedCategory}`;
        }

        if (search) {
            url += `&q=${encodeURIComponent(search)}`;
        }

        fetch(url)
            .then(response => {
                setIsLoading(true);
                if (!response.ok) navigate('*');
                return response.json();
            })
            .then(data => {
                setCatalogItems(prev => [...prev, ...data]);
                setHasMoreItems(data.length >= 6);
                setIsLoading(false);
            })
            .catch(err => {
                navigate('*');
                setIsLoading(false);
            });
    }, [selectedCategory, offset, search]);

    const handleCategoryClick = (categoryId) => {
        if (selectedCategory === categoryId) {
            return;
        }
        setSelectedCategory(categoryId);
        setOffset(0);
        setCatalogItems([]);
        setHasMoreItems(true);
    };

    const loadMoreItems = () => {
        setOffset(prev => prev + 6);
    };

    const handleOnChangeSearchInput = (e) => {
        setIsLoading(true);
        setSearch(e.target.value);
        if (e.target.value) {
            setOffset(0);
            setCatalogItems([]);
        }
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {!isMainFrame && <form className="catalog-search-form form-inline">
                <input className="form-control" placeholder="Поиск" value={search} onChange={handleOnChangeSearchInput} />
            </form>}
            {isLoading ? (
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
    );
}

export default Catalog
