import { Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { SessionContext } from "../Context";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

const REDIRECT_URI = 'http://localhost:3000';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = (props) => {
    const session = useContext(SessionContext);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);

    if (session.token) {
        window.location.replace(`${REDIRECT_URI}/products`);
        return (<></>);
    }

    const tryCreateAccount = () => {
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(credentials => {
                axios.post('users', {
                    uid: credentials.user.uid,
                    name: nameRef.current.value
                })
                .then(_res => props.initSession(credentials.user.accessToken, credentials.user.uid))
                .catch(e => {
                    console.error(e);
                    setError(`Failed to create account: ${e}`);
                });
            })
            .catch(error => {
                if (error.code === 'auth/weak-password') {
                    setError('Password should be at least 6 characters');
                } else if (error.code === 'auth/email-already-in-use') {
                    setError('This email is already in use. Try logging in instead.');
                } else {
                    console.error(`Unexpected error when creating account: ${error.code} ${error.message}`);
                }
            });
    };

    const tryLogin = () => {
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(credentials => {
                props.initSession(credentials.user.accessToken, credentials.user.uid);
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    setError('Incorrect email or password');
                } else {
                    console.error(`Unexpected error when logging in: ${error.code} ${error.message}`);
                }
            });
    };

    return (<>
        <div
            width='100vw'
            height='100vh'
        >
            <Stack
                sx={{
                    width: '20vw',
                    position: 'absolute',
                    left: '50vw',
                    top: '25vh',
                    transform: 'translate(-50%, -50%)'
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
        </div>
    </>);
};

export default Login;