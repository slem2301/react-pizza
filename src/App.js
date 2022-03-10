import React from "react";
import {Header} from "./components/";
import {Home, Cart} from "./pages/";
import {Route} from "react-router-dom";

function App() {
    //const dispatch = useDispatch();
    //
    // window.test = () => {
    //     axis.get('http://localhost:3000/db.json').then(({data}) => {
    //         dispatch(setPizzas(data.pizzas))
    //     });
    // }

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route exact path='/' component={Home}/>
                <Route path='/cart' component={Cart}/>
            </div>
        </div>
    )
}

export default App;

// это для классовой компоненты
// const mapStateToProps = (state) => {
//     return {
//         items: state.pizzas.items,
//         filters: state.filters
//     };
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPizzas: (items) => dispatch(setPizzas(items))
//     }
// }
// // или так
// // const mapDispatchToProps = {
// //     setPizzas,
// // }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
