import { useContext } from "react";
import { SessionContext } from "../Context";

const REDIRECT_URI = 'http://localhost:3000';

const Login = (props) => {
    const session = useContext(SessionContext);

    if (session.token) {
        window.location.replace(`${REDIRECT_URI}/products`);
        return (<></>);
    }

    return (<>
        <button
            onClick={() => {
                props.setToken('dummy token');
                window.location.replace(`${REDIRECT_URI}/products`);
            }}
        >Login</button>
    </>);
};

export default Login;