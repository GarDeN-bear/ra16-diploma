import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CatalogItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(-1);
    const [countItemsToOrder, setCountItemsToOrder] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${import.meta.env.VITE_PORT_SERVER}/api/items/${id}`)
            .then(response => {
                setIsLoading(true);
                if (!response.ok) navigate('*');
                return response.json();
            })
            .then(data => {
                setItem(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }, [id]);

    const handleOnChangeCountToOrder = (isAdd) => {
        const orderLimits = [1, 10];
        if (isAdd && (countItemsToOrder + 1) <= orderLimits[1]) {
            setCountItemsToOrder(countItemsToOrder + 1);
        }

        if (!isAdd && (countItemsToOrder - 1) >= orderLimits[0]) {
            setCountItemsToOrder(countItemsToOrder - 1);
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <section className="catalog-item">
                    <h2 className="text-center">{item.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={item.images[0]}
                                className="img-fluid" alt="" />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{item.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{item.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{item.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{item.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{item.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{item.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии:{item.sizes.map((sizeItem, index) => (
                                    sizeItem.available ?
                                        <span key={index} className={`catalog-item-size ${index === selectedSize ? "selected" : " "}`} onClick={() => setSelectedSize(index)}>{sizeItem.size}</span> : "")
                                )}
                                </p>
                                {
                                    item.sizes.length > 0 ?
                                        (<p>Количество: <span className="btn-group btn-group-sm pl-2">
                                            <button className="btn btn-secondary" onClick={() => handleOnChangeCountToOrder(false)}>-</button>
                                            <span className="btn btn-outline-primary">{countItemsToOrder}</span>
                                            <button className="btn btn-secondary" onClick={() => handleOnChangeCountToOrder(true)}>+</button>
                                        </span>
                                        </p>) :
                                        ("")
                                }
                            </div>
                            {
                                item.sizes.length > 0 ?
                                    (<button className="btn btn-danger btn-block btn-lg" disabled={selectedSize >= 0 ? false : true} onClick={() => navigate("/cart.html")}>В корзину</button>) :
                                    ("")
                            }
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default CatalogItem
