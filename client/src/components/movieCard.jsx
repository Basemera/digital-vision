import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';

function MovieCard(props) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.show.images.medium} />
                <Card.Body>
                    <Card.Title>{props.show.name}</Card.Title>
                    <Card.Text>
                        {props.show.summary}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}


export default MovieCard;