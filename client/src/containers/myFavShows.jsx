import React, { Fragment, useState } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { Spinner, CardDeck } from 'react-bootstrap';
import AppNavBar from '../components/AppNavBar';
import IS_LOGGED_IN from '../queries/isLoggedIn';
import { useQuery } from 'react-apollo';
import GET_USER_FAVOURITE_SHOWS from '../queries/getUserFavouriteShows';
import MovieCard from '../components/MovieCard'


function MyFavShows({ children, ...rest }) {
    let { query, setQuery } = useState(GET_USER_FAVOURITE_SHOWS);
    let {favQuery, setFavQuery } = useState();
    let { data, loading, error } = useQuery(GET_USER_FAVOURITE_SHOWS);
    // let { data, loading, error } = useQuery(query, { variables });

    return (
        <div>
            <AppNavBar></AppNavBar>
            <CardDeck>
                <Fragment>
                    {
                        data && data.myFavs
                            ? data.myFavs.map(show => {
                                return <MovieCard key={show.id} show={show} />
                            })
                            :
                            loading ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
                            : error ? <p>Something went wrong</p>
                            : <p>No results to show</p>
                    }
                </Fragment>
            </CardDeck>
        </div>




    )
}

export default MyFavShows;