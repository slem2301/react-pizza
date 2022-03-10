import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Categories, Sorting, PizzaBlock, PizzaLoadingBlock} from "../components";

import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
// import {addPizzaToCart} from "../redux/actions/cart";
import { ADD_PIZZA_CART } from '../redux/actions/actionsType';

const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене по убыванию', type: 'price', order: 'desc' },
    { name: 'цене по возрастанию', type: 'price', order: 'asc' },
    { name: 'алфавиту по убыванию', type: 'name', order: 'desc' },
    { name: 'алфавиту по возрастанию', type: 'name', order: 'asc' },
];

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items); // количество в корзине
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    // Чтобы получить базу с пицами
    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, dispatch, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, [dispatch]);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch]);

    const handleAddPizzaToCart = obj => {
        dispatch({
           type: ADD_PIZZA_CART,
           payload: obj 
        })
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <Sorting
                    activeSortType={sortBy.type}
                    activeSortOrder={sortBy.order}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                    <PizzaBlock 
                    onClickAddPizza={handleAddPizzaToCart} 
                    key={obj.id}
                    addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                    {...obj} />))
                    : Array(12).fill(0)
                    .map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
        </div>
    );
};

export default Home;
