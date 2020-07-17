import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import fakeAuth from '../handlers/fakeAuth'



const AuthButton = (props) => {
    const history = useHistory();
    return fakeAuth.isAuthenticated ? (
        <Button className="btn btn-primary btn-user btn-block" onClick={() => {
            fakeAuth.signout(() => history.push("/login"));
            console.log(props.history);
        }}>Logout</Button>
    ): <Button className="btn btn-primary btn-user btn-block" onClick={() => {
        fakeAuth.authenticate(() => history.push(props.history.pathname));
        console.log(props.history.pathname);
    }}>Login</Button>
}

export default AuthButton