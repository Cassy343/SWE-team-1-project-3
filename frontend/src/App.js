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
import axios from 'axios';
import {createTheme, ThemeProvider} from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            light: '#C3E8CA',
            main: '#709C79',
            dark: '#1D5929'
        }
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
    }
    
})

const sessionReducer = (session, action) => {
    switch (action.type) {
        case 'init': {
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
        case 'logout':
            return { ...session, token: null, uid: null };
        default:
            console.error(`Unknown session reduction action: ${action}`)
            return session;
    }
};

const App = () => {
    const [session, dispatch] = useReducer(sessionReducer, {
        cart: {},
        token: window.localStorage.getItem('token'),
        uid: window.localStorage.getItem('uid')
    });

    const initSession = (token, uid) => {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uid', uid);

        dispatch({
            type: 'init',
            payload: {
                token: token,
                uid: uid
            }
        });
    };

    const logout = () => {
        if (!session.token) {
            return;
        }

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uid');

        axios.delete('auth', {
            headers: {
                'access-token': session.token
            }
        });

        dispatch({ type: 'logout', payload: null });
    };


    return (
    <ThemeProvider theme={theme}>
    <SessionContext.Provider value={session}>
        <BrowserRouter className='App'>
            <Routes>
                <Route
                    path='/' // goes to login page
                    element={<Login initSession={initSession} />}
                />
                <Route
                    path='/'
                    element={<Nav logout={logout} />}
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
    </SessionContext.Provider>
    </ThemeProvider>
    );
};

export default App;
