import { Box, Paper, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import './Nav.css';
import { useState } from 'react';

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
                    justifyContent='left'
                    id='nav-stack'
                >
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
                    <Box
                        onClick={props.logout}
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