// import React from 'react';
import React, { Fragment, useMutation } from 'react';

import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import fakeAuth from '../handlers/fakeAuth';
import LOGIN from '../queries/login';
import GET_ALL_SHOWS from "../queries/getAllShows";




const AuthButton = (props) => {

    // const [Login ] = useMutation(LOGIN, {
    //     variables: { username: props.input.username,
    //                 password: props.input.password },
    //   });



    const history = useHistory();
    return fakeAuth.isAuthenticated ? (
        <Button className="btn btn-primary btn-user btn-block" onClick={() => {
            fakeAuth.signout(() => history.push("/login"));
        }}>Logout</Button>
    ) : <Button className="btn btn-primary btn-user btn-block" onClick={() => {
    
        fakeAuth.authenticate(() => history.push(props.history.pathname));
    }}>Login</Button>
}

export default AuthButton