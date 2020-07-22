import React, { useState, Fragment } from 'react';
import {
    Card,
    Button,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col
} from 'react-bootstrap';



function ShowDetails(props) {

    return (
        <Container fluid>
            <Row className="justify-content-md-center" xl={2}>
                <Col md="auto">

                    <Card style={{ width: '50rem' }}>
                        <Card.Img variant="top" />
                        <Card.Body>
                            <Card.Text>
                                <Card.Img variant="top" src={props.show.images.medium} style={{ width: '30rem' }} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="auto">
                    <Card style={{ width: '50rem' }}>
                        <Card.Body>
                            <Card.Text>
                                <h3>Rating</h3>
                                <p>
                                    <li>
                                        {props.show.rating.average.average}
                                    </li>                                 </p>
                            </Card.Text>

                            <Card.Text>
                                <h3>Genre</h3>
                                {
                                    props.show.genre.map(g => {
                                        return <li>{g}</li>
                                    })
                                }
                            </Card.Text>

                            <Card.Text>
                                <h3>Date or premier</h3>
                                {props.show.dateOfPremier}
                            </Card.Text>
                            <Card.Text>
                                <h3>Summary</h3>
                                {props.show.summary}
                            </Card.Text>
                            <Button variant="primary" href=''>View more</Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}
export default ShowDetails