import './Login.css';
import { Box, Button, ButtonGroup, Paper, Stack, TextField, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { SessionContext } from "../Context";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Hero from './ushop-login-hero.jpg';
import Logo from '../ushop.png';
import Helmet from 'react-helmet';

const Login = (props) => {
    const session = useContext(SessionContext);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    if (session.token) {
        return (<>
            <Navigate to={`/products`} />
        </>);
    }

    const tryCreateAccount = () => {
        axios.post('auth', {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }).then(res => {
            const content = res.data;
            
            if (content.status === 'ok') {
                props.initSession(content.data.accessToken, content.data.uid);
            } else {
                if (content.data.code === 'auth/weak-password') {
                    setError('Password should be at least 6 characters');
                } else if (content.data.code === 'auth/email-already-in-use') {
                    setError('This email is already in use. Try logging in instead.');
                } else {
                    console.error(`Unexpected error when creating account: ${content.data}`);
                }
            }
        }).catch(error => {
            console.error(`Unexpected error when creating account: ${error}`);
        });
    };

    const tryLogin = () => {
        axios.put('auth', {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }).then(res => {
            const content = res.data;

            if (content.status === 'ok') {
                props.initSession(content.data.accessToken, content.data.uid);
            } else {
                if (content.data.code === 'auth/wrong-password' || content.data.code === 'auth/user-not-found') {
                    setError('Incorrect email or password');
                } else {
                    console.error(`Unexpected error when logging in: ${content.data}`);
                }
            }
        }).catch(error => {
            console.error(`Unexpected error when logging in: ${error}`);
        });
    };

    return (<>
        <Helmet><title>Ushop | Login</title></Helmet>
        <Box id='login-container'>
            <Box
                sx={{
                    backgroundImage: `url(${Hero})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative'
                }}
                width='70vw'
                height='100vh'
            />
            <Box id='login-form-container'>
                <Box id='logo-container'>
                    <img src={Logo} alt='logo' id='logo' />
                    <Typography variant='h4'>shop</Typography>                    
                </Box>
                <Typography>Where everyone can share!</Typography>
                <Box height='1.5rem' />
                <Stack
                    sx={{
                        width: '25vw'
                    }}
                    spacing={2}
                >
                    {creatingAccount && <TextField
                        variant='outlined'
                        label='Name'
                        inputRef={nameRef}
                        required
                    />}
                    <TextField
                        variant='outlined'
                        label='Email'
                        inputRef={emailRef}
                        required
                    />
                    <TextField
                        variant='outlined'
                        label='Password'
                        type='password'
                        inputRef={passwordRef}
                        required
                    />
                    {error && <Typography
                        variant='body1'
                        color='error'
                    >
                        {error}
                    </Typography>}
                    <ButtonGroup
                        variant='contained'
                    >
                        <Button
                            sx={{
                                width: '50%'
                            }}
                            onClick={() => {
                                if (creatingAccount) {
                                    setCreatingAccount(false);
                                    setError(null);
                                } else {
                                    tryLogin();
                                }
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            sx={{
                                width: '50%'
                            }}
                            onClick={() => {
                                if (creatingAccount) {
                                    tryCreateAccount();
                                } else {
                                    setCreatingAccount(true);
                                    setError(null);
                                }
                            }}
                        >
                            Create Account
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Box>
        </Box>
    </>);
};

export default Login;