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
    Spinner,
    InputGroup
} from 'react-bootstrap';
import {
    useLocation,
    useHistory
} from 'react-router-dom'


function MainShowContainer() {
    const location = useLocation();
    const history = useHistory()
    function setPathName({ ...location }) {
        let { pathname } = location;
        pathname = "/shows"
        history.push(pathname)
    }


    function handleSearch() {
        query = SEARCH_BY_NAME
        setVariables({ name: searchTerm })
        setQuery(query)
    }

    function handleActionSearch(e) {
        if (e === "Action") {
            query = SEARCH_BY_GENRE
            setVariables({ genre: e })
            setQuery(query)
        }
    }

    let [variables, setVariables] = useState()
    let [query, setQuery] = useState(GET_ALL_SHOWS)
    let [searchTerm, setSearchTerm] = useState();
    let { data, loading, error } = useQuery(query, { variables });
    return (

        <Fragment>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Digital Vision</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Shows</Nav.Link>
                            <Nav.Link href="/shows">My Shows</Nav.Link>
                            <NavDropdown title="Genres" id="basic-nav-dropdown">
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Action" href="#action/3.3">Action</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Drama" href="#action/3.1">Drama</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Comedy" href="#action/3.2">Comedy</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Crime" href="#action/3.3">Crime</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Children" href="#action/3.3">Children</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Music" href="#action/3.3">Music</NavDropdown.Item>
                                <NavDropdown.Item onSelect={(e, eventKey) => { handleActionSearch(e) }} eventKey="Romance" href="#action/3.3">Romance</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">

                                </NavDropdown.Item>
                            </NavDropdown>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Rating</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Rating"
                                    aria-label="Rating"
                                    aria-describedby="basic-addon1"
                                    onChangeCapture={(e) => {
                                        //TODO: implement handleRatingSearch(e)
                                    }}
                                />
                            </InputGroup>
                        </Nav>
                        <Form inline>
                            <FormControl
                                onKeyPress={
                                    (event) => {
                                        if (event.key === "Enter") {
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

                                type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            {
                loading || error || !data ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : <ShowGrid shows={data}></ShowGrid>
            }
        </Fragment>

    )
}

export default MainShowContainer;