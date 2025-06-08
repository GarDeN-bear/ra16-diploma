import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css'

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Catalog from "./components/Catalog.jsx";
import CatalogItem from "./components/CatalogItem.jsx";
import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Contacts from "./components/Contacts.jsx";
import Fail from "./components/Fail.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src="../../img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                        <Routes>
                            <Route path='/' exec element={<Main />} />
                            <Route path='/catalog.html' element={<Catalog />} />
                            <Route path='/catalog/:id.html' element={<CatalogItem />} />
                            <Route path='/cart.html' element={<Cart />} />
                            <Route path='/about.html' element={<About />} />
                            <Route path='/contacts.html' element={<Contacts />} />
                            <Route path='*' element={<Fail />} />
                        </Routes>
                    </div>
                </div>
            </main>
            <Footer />
        </Router>
    )
}

export default App
