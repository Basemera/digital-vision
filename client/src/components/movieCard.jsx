import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';
import {
    useLocation,
    useHistory
} from 'react-router-dom'

function MovieCard(props) {
    const location = useLocation();
    const history = useHistory()

    return (
        <div style={{ marginBottom:"50px"}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.show.images.medium} />
                <Card.Body>
                    <Card.Title>{props.show.name}</Card.Title>
                    <Card.Text>
                        {props.show.summary}
                    </Card.Text>
                    <Button variant="primary" href={`/show/${props.show.id}`}>View more</Button>
                </Card.Body>
            </Card>
        </div>
    )
}


export default MovieCard;