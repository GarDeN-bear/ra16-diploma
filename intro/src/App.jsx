import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/style.css'

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Catalog from "./components/Catalog.jsx";
import About from "./components/About.jsx";
import Contacts from "./components/Contacts.jsx";
import Footer from "./components/Footer.jsx";
import Fail from "./components/Fail.jsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' exec element={<Main />} />
                <Route path='/catalog.html' element={<Catalog />} />
                <Route path='/about.html' element={<About />} />
                <Route path='/contacts.html' element={<Contacts />} />
                <Route path='*' element={<Fail />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
