import React, { useState, Fragment } from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    Button,
    FormControl,
    Dropdown,
    InputGroup,
    DropdownButton,
    Modal
} from 'react-bootstrap';

import { useQuery } from "@apollo/react-hooks";
import SEARCH_BY_NAME from '../queries/searchByName.js';
// import Search from './Search';
import Search from '../components/Search';
import Searchname from './Searchname.jsx';

import MovieCard from '../components/MovieCard';
import { CardDeck } from 'react-bootstrap';
import SearchName from '../containers/SearchName.jsx';
import Searchbygenre from './Searchbygenre.jsx';

const AppNavBar = () => {
    const [name, setName] = useState('')
    const { loading, error, data } = useQuery(SEARCH_BY_NAME, {
        variables: { name },
    });

    data != undefined && data.show != [] ? console.log(data.show) : console.log('go');
    const [show, setShow] = useState(false);
    const [genre, setSearchTerm] = useState('');

    const handleClose = (genre, e) => {
        // console.log("memem");
        console.log(genre)

        return (
            <Searchbygenre name={e} />
        )
        // Searchbygenre(e)


        // setShow(false)
    };
    const handleShow = (e) => {
        // setSearchTerm(e);
        console.log("tr");
        setShow(true);
        setSearchTerm(e)
        // setShow(false);

        // console.log(event.target.value)
    }


    // define extra filters here. Get search terms from advanced filter add to array and then pass to AdvavcedSearchFilter. 
    //In advanced filter filter by items in array. forexample if genre appears first then get by that genre.
    // implement pagination which returns number of pages so loop thru until last page and apply filter
    // then move on to next filter
    // at every step display a new set of results t user
    //until final result set

    return (

        <Fragment>

            

            {
                data != undefined && data.show != undefined && data.show.length ?
                    <SearchName shows={data.show} />
                    :
                    <div>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand href="#home">Digital Vision</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#home">Shows</Nav.Link>
                                    <Nav.Link href="#link">My Shows</Nav.Link>
                                    <NavDropdown title="Organise" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1" genre={"genre"} onClick={
                                            (e) => { handleShow('genre') }}>Genre</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2" onClick={handleShow}>Rating</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3" onClick={handleShow}> Date of premier</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onKeyPress={
                                        async (event) => {
                                            if (event.key === "Enter") {

                                                // event.preventDefault();
                                                setName(event.target.value)
                                            }
                                        }
                                    } />

                                    <Button variant="outline-success">Search</Button>
                                </Form>





                                <Modal show={show} genre={genre} onHide={handleClose(genre)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Search</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>

                                            <FormControl type="text" placeholder="enter search term" className="mr-sm-2" onKeyPress={
                                                async (event) => {
                                                    if (event.key === "Enter") {
                                                        console.log(event.target.value);
                                                        handleClose(event)
                                                    }
                                                }
                                            } />


                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>

                                    </Modal.Footer>
                                </Modal>




                            </Navbar.Collapse>
                        </Navbar>
                    </div>
            }

            <div>

            </div>

        </Fragment>


    );
}


export default AppNavBar;
