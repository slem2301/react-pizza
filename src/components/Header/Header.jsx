import logoSvg from "../../assets/img/pizza-logo.svg";
import React from "react";
import {ButtonCart} from "../../components/";
import {Link, Route} from "react-router-dom";
import {useSelector} from "react-redux";


function Header() {
    const {totalPrice, totalCount} = useSelector(({cart}) => cart);  // из объекта карт вытаскиваем значения

    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header__logo">
                        <img width="38" src={logoSvg} alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <Link to='/cart'>
                    <Route path='/' exact>
                        <ButtonCart cart totalPrice={totalPrice} totalCount={totalCount}/>
                    </Route>
                </Link>
            </div>
        </div>
    );
}

export default Header;