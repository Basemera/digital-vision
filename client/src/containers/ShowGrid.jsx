import React, { Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import GET_ALL_SHOWS from "../queries/getAllShows";
import AppNavBar from '../components/AppNavBar';
import MovieCard from '../components/MovieCard'
import { CardDeck } from 'react-bootstrap';



const ShowGrid = (props) => {
    return (
        <div>
            <CardDeck>
                <Fragment>
                    {
                        props && props.shows.show && props.shows.show.length
                        ? props.shows.show.map(show => {
                            return <MovieCard key={show.id} show={show} />
                        })
                        : props.shows.shows.map(item => {
                            return <MovieCard key={item.id} show={item} />
                        })
                    }
                </Fragment>
            </CardDeck>
        </div>
    );
}

export default ShowGrid;