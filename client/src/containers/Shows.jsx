import React, { Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import MovieCard from "../components/movieCard"
import AppBar from "../components/AppBar"
import GET_ALL_SHOWS from "../queries/getAllShows";



const Shows = () => {
    const { data, loading, error } = useQuery(GET_ALL_SHOWS);
    if(loading) return <p>Loading</p>;
    if(error) return <p>ERROR</p>;
    if(!data) return <p>NOT FOUND</p>;

    console.log(data);

    return(
        <Fragment>
            <AppBar/>
            {
                data.shows && data.shows.map(show => (<MovieCard key={show.id} show={show}></MovieCard>))
            }
        </Fragment>
    );
}

export default Shows;