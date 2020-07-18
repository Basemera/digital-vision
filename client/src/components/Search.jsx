import React, { useState, Fragment } from 'react';

import { useQuery } from "@apollo/react-hooks";
import SEARCH_BY_NAME from '../queries/searchByName.js';
import Searchname from './Searchname';
import AppNavBar from '../components/AppNavBar';
import MovieCard from '../components/MovieCard';
import { CardDeck } from 'react-bootstrap';

function Search({loading, error, data }) {
    // const [name, setName] = useState('')
    // console.log(name);
    // const { loading, error, data } = useQuery(SEARCH_BY_NAME, {
    //     variables: { name },
    // });
    console.log(data);
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>NOT FOUND</p>;
    
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
export default Search;