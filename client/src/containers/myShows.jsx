import React, { Fragment, useState } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { Spinner, CardDeck } from 'react-bootstrap';
import AppNavBar from '../components/AppNavBar';
import IS_LOGGED_IN from '../queries/isLoggedIn';
import { useQuery } from 'react-apollo';
import GET_USER_SCHEDULED_SHOWS from '../queries/getUserScheduledShows';
import MovieCard from '../components/MovieCard'


function MyShows({ children, ...rest }) {
    let { data, loading, error } = useQuery(GET_USER_SCHEDULED_SHOWS);

    return (
        <div>
            <AppNavBar></AppNavBar>
            <CardDeck>
                <Fragment>
                    {
                        data && data.myShows
                            ? data.myShows.map(show => {
                                return <MovieCard key={show.id} show={show} />
                            })
                            :
                            loading || !data ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
                            : <p>No results to show</p>
                    }
                </Fragment>
            </CardDeck>
        </div>




    )
}

export default MyShows;