import React from 'react';
import { 
    Navbar ,
    Nav,
    NavDropdown,
    Form,
    Button,
    FormControl
} from 'react-bootstrap';

function AppNavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Digital Vision</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Shows</Nav.Link>
                    <Nav.Link href="#link">My Shows</Nav.Link>
                    <NavDropdown title="Organise" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Schedule</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Genres</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Schedule</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default AppNavBar;
