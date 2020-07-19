// import React from 'react';
import React, { Fragment, useMutation } from 'react';
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-apollo'
import IS_LOGGED_IN from '../queries/isLoggedIn'





const AuthButton = (props) => {
    const {data} = useQuery(IS_LOGGED_IN)
    return data.isLoggedIn ? (
        <Button className="btn btn-primary btn-user btn-block">Logout</Button>
    ) : <Button className="btn btn-primary btn-user btn-block" onClick={
        props.login({username:props.username, password:props.password})
    }>Login</Button>
}

export default AuthButton