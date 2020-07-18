import React, { Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import GET_ALL_SHOWS from "../queries/getAllShows";
import AppNavBar from '../components/AppNavBar';
import MovieCard from '../components/MovieCard';
import { CardDeck } from 'react-bootstrap';



const SearchName = (props) => {

console.log(props.shows);
    return (
        <div>
            <AppNavBar></AppNavBar>
            <CardDeck>
                <Fragment>
                    {
                        props.shows.map(show => {
                            return <MovieCard key={show.id} show={show} />
                        })
                    }
                </Fragment>
            </CardDeck>

        </div>
    );
}

export default SearchName;