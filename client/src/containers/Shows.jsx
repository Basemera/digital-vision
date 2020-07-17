import React, { Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import GET_ALL_SHOWS from "../queries/getAllShows";
import AppNavBar from '../components/AppNavBar';
import MovieCard from '../components/MovieCard';
import { CardDeck } from 'react-bootstrap';



const Shows = () => {

    const { data, loading, error } = useQuery(GET_ALL_SHOWS);
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>NOT FOUND</p>;

    console.log(data);

    return (
        <div>
            <AppNavBar></AppNavBar>
            <CardDeck>
                <Fragment>
                    {
                        data.shows.map(show => {
                            return <MovieCard key={show.id} show={show} />
                        })
                    }
                </Fragment>
            </CardDeck>

        </div>
    );
}

export default Shows;