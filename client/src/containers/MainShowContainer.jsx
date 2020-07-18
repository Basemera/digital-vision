import React, { Fragment, useState } from 'react';
import { useQuery } from "react-apollo"
import GET_ALL_SHOWS from "../queries/getAllShows";
import SEARCH_BY_NAME from "../queries/searchByName";
import ShowGrid from './ShowGrid';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    Button,
    FormControl,
    Spinner
} from 'react-bootstrap';


function MainShowContainer() {

    function handleSearch(){
        console.log(`searching for shows with ${searchTerm}`)
        query = SEARCH_BY_NAME
        setVariables({name:searchTerm})
        setQuery(query)
    }

    let [variables, setVariables] = useState()
    let[query, setQuery] = useState(GET_ALL_SHOWS)
    let [searchTerm, setSearchTerm] = useState();
    let { data, loading, error } = useQuery(query, {variables});

    return (

        <Fragment>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Digital Vision</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Shows</Nav.Link>
                            <Nav.Link href="#link">My Shows</Nav.Link>
                            <NavDropdown title="Organise" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Genre</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Rating</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Date of premier</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl 
                            onKeyPress={
                                (event) => {
                                    if (event.key === "Enter"){
                                        setSearchTerm(event.target.value)
                                        handleSearch()
                                        event.preventDefault();
                                    }
                                    
                                }
                            } 
                            onChange={
                                (event) => {
                                    setSearchTerm(event.target.value)
                                }
                            }

                            type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            {
                loading || error || !data ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>:<ShowGrid shows={ data }></ShowGrid>
            }
        </Fragment>

    )
}

export default MainShowContainer;