import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = ({ setCountCartItems }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const newCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(newCart);
        setCountCartItems(newCart.length);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setTotalPrice(cart.reduce((sum, item) => sum + item.totalPrice, 0));
    }, [cart]);

    const handleRemoveItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCountCartItems(newCart.length);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/order`, {
            method: 'POST',
            body: JSON.stringify({
                "owner": {
                    "phone": phone,
                    "address": address
                },
                "items": cart
            })
        });
        if (response.ok) {
            localStorage.removeItem('cart');
            setCart([]);
            setTotalPrice(0);
            setPhone('');
            setAddress('');
            setCountCartItems(0);
            setAgreement(false);
            setSuccessMessage("Заказ успешно оформлен!");
        } else {
            setErrorMessage("Ошибка сети. Попробуйте позже.");
        }
        setIsLoading(false);
    }

    return (
        <> {isLoading ? (
            <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        ) : (
            <>
                <section className="cart">
                    <h2 className="text-center">Корзина</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Стоимость</th>
                                <th scope="col">Итого</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td><Link to={`/catalog/${item.id}.html`}>{item.title}</Link></td>
                                        <td>{item.size}</td>
                                        <td>{item.count}</td>
                                        <td>{item.price} руб.</td>
                                        <td>{item.totalPrice} руб.</td>
                                        <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveItem(index)}>Удалить</button></td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan="5" className="text-right">Общая стоимость</td>
                                <td>{totalPrice} руб.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="order">
                    {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <h2 className="text-center">Оформить заказ</h2>
                    <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
                        <form className="card-body" onSubmit={handleOnSubmit}>
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Адрес доставки</label>
                                <input className="form-control" id="address" placeholder="Адрес доставки" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="agreement" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} required />
                                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                            </div>
                            <button type="submit" disabled={cart.length > 0 ? false : true} className="btn btn-outline-secondary">Оформить</button>
                        </form>
                    </div>
                </section >
            </>
        )}
        </>
    );
}

export default Cart
