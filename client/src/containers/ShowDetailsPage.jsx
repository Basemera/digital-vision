import React, { Fragment, useState } from 'react';
import {
    Route,
    Redirect,
    useParams
} from 'react-router-dom';
import { Spinner, CardDeck } from 'react-bootstrap';
import AppNavBar from '../components/AppNavBar';
import IS_LOGGED_IN from '../queries/isLoggedIn';
import { useQuery } from 'react-apollo';
import GET_USER_SCHEDULED_SHOWS from '../queries/getUserScheduledShows';
import ShowDetails from '../components/ShowDetails'
import GET_SHOW_DETAILS from '../queries/getShowDetails';


function ShowDetailsPage() {
    // let { data, loading, error } = useQuery(GET_USER_SCHEDULED_SHOWS);
let { id } = useParams();
let { data, loading, error } = useQuery(GET_SHOW_DETAILS, {
    variables: {
        id: Number(id)
    }
});

    return (
        <div>

            <AppNavBar />
            <Fragment>
                {
                    data && data.show
                        ? 
                            <ShowDetails key={data.show.id} show={data.show} />
                        :
                        loading || !data ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
                            : <p>No results to show</p>
                }
            </Fragment>
        </div>



    )
}

export default ShowDetailsPage;