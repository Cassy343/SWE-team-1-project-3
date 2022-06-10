import { Box, Paper, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import './Nav.css';
import { useState } from 'react';
import Logo from './ushop.png';

const NavButton = (props) => {
    return (
        <Box
            sx={{
                backgroundColor: props.selected ? '#efefef' : '#ffffff'
            }}
            className='nav-button'
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
        >
            {props.children}
        </Box>
    );
};

const Nav = (props) => {
    const [selectedLink, setSelectedLink] = useState(0);

    const links = [
        {
            to: "/products",
            label: "View Products"
        },
        {
            to: "/cart",
            label: "View Cart"
        },
        {
            to: "/my-products",
            label: "My Products"
        }
    ];

    return (<>
        <Paper
            id='nav-bar'
        >
            <nav>
                <Stack
                    direction='row'
                    alignItems='center'
                    id='nav-stack'
                    justifyContent='left'
                >
                    <Box onClick={() => setSelectedLink(0)}>
                        <Link
                            to='/products'
                            className='nav-link'
                        >
                            <Box id='nav-logo-container'>
                                <img src={Logo} alt='logo' id='nav-logo' width='50px'/>                 
                            </Box>
                        </Link>
                    </Box>
                    {
                        links.map((link, index) => <Box
                            key={link.to}
                            onClick={() => setSelectedLink(index)}
                        >
                            <Link
                                to={link.to}
                                className='nav-link'
                            >
                                <NavButton selected={index === selectedLink}>
                                    {link.label}
                                </NavButton>
                            </Link>
                        </Box>)
                    }
                    <Box sx={{flexGrow: 1}}></Box>
                    <Box
                        onClick={props.logout}
                        sx={{ marginRight: '1rem' }}
                    >
                        <Link
                            to='/'
                            className='nav-link'
                        >
                            <NavButton selected={false}>
                                Logout
                            </NavButton>
                        </Link>
                    </Box>
                </Stack>
            </nav>
        </Paper>
        <Outlet />
    </>);
};

export default Nav;