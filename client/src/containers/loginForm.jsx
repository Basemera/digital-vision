import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
    Link,
    BrowserRouter as Router,
    Route,
    useHistory,
    useLocation
} from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo'
import LOGIN_USER from '../queries/login'







function LoginForm() {
    let history = useHistory();
    let location = useLocation();
    let [token, setToken] = useState()
    const client = useApolloClient();
    let [login, { data }] = useMutation(LOGIN_USER, {
        onCompleted({ login }) {
            localStorage.setItem("token", login.token);
            client.writeData({ data: { isLoggedIn: login.token === localStorage.getItem('token') } });
        }
    });
    
    async function onLoginHandler(){
        let resultData = await login({variables:{username, password}})
        if(resultData.data.login.username !== null && resultData.data.login.token !== null){
            setToken(resultData.data.login.token)
            history.push(from);
        }
        
    }

    let { from } = location.state || { from: { pathname: "/" } }

    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    return (
        <Container fluid className="bg-gradient-primary">
            <Row className="justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <Card className="o-hidden border-0 shadow-lg my-5">
                        <Card.Body className="p-0">
                            <Row>
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1>
                                                <Card.Text className="h4 text-gray-900 mb-4">Digital Vision Login</Card.Text>
                                            </h1>
                                        </div>
                                        <Form className="user">
                                            <Form.Group className="form-group" controlId="exampleInputEmail">
                                                <Form.Control type="text" className="form-control form-control-user" placeholder="Enter username..." onChange={
                                                    (event) => {
                                                        setUsername(event.target.value)
                                                    }
                                                }></Form.Control>
                                            </Form.Group>
                                            <Form.Group className="form-group" controlId="exampleInputPassword">
                                                <Form.Control type="password" className="form-control form-control-user" placeholder="Password" onChangeCapture={
                                                    (event) => {
                                                        setPassword(event.target.value)
                                                    }
                                                }></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="customCheck" className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <Form.Control type="checkbox" className="custom-control-input"></Form.Control>
                                                    <Form.Label className="custom-control-label">Remember Me</Form.Label>
                                                </div>
                                            </Form.Group>
                                            <Button className="btn btn-primary btn-user btn-block" onClick={onLoginHandler} history={from}>Login</Button>
                                            <hr></hr>
                                        </Form>
                                        <div className="text-center">
                                            <a className="small" href="/">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="/">Create an Account</a>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </Container>
    )
}

export default LoginForm;