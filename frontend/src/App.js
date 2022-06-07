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
        case 'add-to-cart': {
            const id = action.payload.id;
            const cart = { ...session.cart };

            if (!cart[id]) {
                cart[id] = {
                    ...action.payload.item,
                    qty: 0
                };
            }

            cart[id] = {
                ...cart[id],
                qty: cart[id].qty + 1
            };
            
            return { ...session, cart: cart };
        }
        case 'remove-one-from-cart': {
            const id = action.payload.id;
            const cart = { ...session.cart };

            if (!cart[id]) {
                return session;
            }

            cart[id] = {
                ...cart[id],
                qty: cart[id].qty - 1
            };

            if (cart[id].qty <= 0) {
                delete cart[id];
            }
            
            return { ...session, cart: cart };
        }
        case 'remove-from-cart': {
            const id = action.payload.id;
            const cart = { ...session.cart };

            if (cart[id]) {
                delete cart[id];
            }
            
            return { ...session, cart: cart };
        }
        default:
            console.error(`Unknown session reduction action: ${action}`)
            return session;
    }
};

const App = () => {
    const [session, dispatch] = useReducer(sessionReducer, {
        cart: {}
    });

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
                        element={<Item
                            addToCart={(id, item) => dispatch({
                                type: 'add-to-cart',
                                payload: {
                                    id: id,
                                    item: item
                                }
                            })}
                            removeOneFromCart={id => dispatch({
                                type: 'remove-one-from-cart',
                                payload: {
                                    id: id
                                }
                            })}
                        />}
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
