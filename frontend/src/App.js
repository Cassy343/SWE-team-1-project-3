import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Login from './login/Login';
import Products from './products/Products';
import Item from './item/Item';
import Cart from './cart/Cart';
import MyProducts from './my-products/MyProducts';
import { SessionContext } from './Context';
import { useReducer } from 'react';

const sessionReducer = (session, action) => {
    switch (action.type) {
        case 'init': {
            console.log(`Auth token: ${action.payload.token}`);

            return { ...session, token: action.payload.token, uid: action.payload.uid };
        }
        default:
            console.error(`Unknown session reduction action: ${action}`)
            return session;
    }
};

const App = () => {
    const [session, dispatch] = useReducer(sessionReducer, {});

    const initSession = (token, uid) => {
        dispatch({
            type: 'init',
            payload: {
                token: token,
                uid: uid
            }
        });
    };

    return (<SessionContext.Provider value={session}>
        <BrowserRouter className='App'>
            <Routes>
                <Route
                    path='/' // goes to login page
                    element={<Login initSession={initSession} />}
                />
                <Route
                    path='/'
                    element={<Nav />}
                >
                    <Route
                        path='/products'
                        element={<Products />}
                    />
                    <Route
                        path='/item'
                        element={<Item />}
                    />
                    <Route
                        path='/cart'
                        element={<Cart />}
                    />
                    <Route
                        path='/my-products'
                        element={<MyProducts />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </SessionContext.Provider>);
};

export default App;
