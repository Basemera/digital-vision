import React, { Fragment, useState } from 'react';
import { useQuery } from "react-apollo"
import GET_ALL_SHOWS from "../queries/getAllShows";
import SEARCH_BY_NAME from "../queries/searchByName";
import SEARCH_BY_GENRE from "../queries/searchByGenre"
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

    function handleActionSearch() {
        console.log(`searching for shows by genre`);
        query = SEARCH_BY_GENRE
        setVariables({genre:"Comedy"})
        setQuery(query)
    }

    let [variables, setVariables] = useState()
    let[query, setQuery] = useState(GET_ALL_SHOWS)
    let [searchTerm, setSearchTerm] = useState();
    let { data, loading, error } = useQuery(query, {variables});
    console.log(data)
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
                            <NavDropdown title="Genres" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleActionSearch} href="#action/3.3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Drama</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Comedy</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Crime</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Childrem</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Music</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Romance</NavDropdown.Item>
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