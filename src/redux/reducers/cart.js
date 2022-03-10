import { ADD_PIZZA_CART, CLEAR_CART, REMOVE_CART_ITEM, PLUS_CART_ITEM, MINUS_CART_ITEM } from "../actions/actionsType";

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value
    }, 0);
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PIZZA_CART: {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {// при добавлении пиццы, создаем новый обект
                ...state.items, //возвращаем старые данные
                [action.payload.id]: { // и добавляем новую пиццу по id
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                }

            };

            // const allPizzas = [].concat.apply([], Object.values(newItems)); // Получаем массив всех пицц
            // const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            // const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0); // Суммируем итоговую сумму пицц

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,  // Передает актуалбное значение ключей(количество), объеденяя их в один маасив и выводят количество
                totalPrice,
            };
        }

        case PLUS_CART_ITEM: {
            const newItemsPlus = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];

            const newItems = {
                ...state.items,
                [action.payload]: {
                  items: newItemsPlus,
                  totalPrice: getTotalPrice(newItemsPlus),
                },
              };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
                }
            }

        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items;
            const newObjItems =
                oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }

        case CLEAR_CART:
            return {
                totalPrice: 0,
                totalCount: 0,
                items: {}
            };

        case REMOVE_CART_ITEM:  // удаление из корзины
            const newItems = {  // копируем старые значения
                ...state.items
            };
            const currentTotalPrice = newItems[action.payload].totalPrice;  // цена одной категории пицц
            const currentTotalCount = newItems[action.payload].items.length;  // количество пицц в категории
            delete newItems[action.payload]; // удаляем пиццы из объекта
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice, // удаляем вместе с пиццами и цену
                totalCount: state.totalCount - currentTotalCount, // удаляем вместе с пиццами и количество
            };

        default:
            return state;
    }
};

export default cart;