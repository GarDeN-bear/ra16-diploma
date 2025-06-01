import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link to="/" className="navbar-brand">
                            <img src="../../img/header-logo.png" alt="Bosa Noga" />
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                    <Link to="/" className="nav-link">Главная</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/catalog.html' ? 'active' : ''}`}>
                                    <Link to="/catalog.html" className="nav-link">Каталог</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/about.html' ? 'active' : ''}`}>
                                    <Link to="/about.html" className="nav-link">О магазине</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/contacts.html' ? 'active' : ''}`}>
                                    <Link to="/contacts.html" className="nav-link">Контакты</Link>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    <div className="header-controls-pic header-controls-cart">
                                        <div className="header-controls-cart-full">1</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск" />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header
