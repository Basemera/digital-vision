import React from 'react';

import { useQuery } from "@apollo/react-hooks";
import SEARCH_BY_NAME from '../queries/searchByName.js';
import { useState, Fragment } from "react";
import SEARCH_BY_GENRE from '../queries/searchByGenre'
import SearchName from './Searchname';

import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    Button,
    FormControl,
    Dropdown,
    InputGroup,
    DropdownButton,
    Modal
} from 'react-bootstrap';

const SearchByGenre = (props) => {
    console.log(props);
    const name = props.name;
    console.log(name);
    const { loading, error, data } = useQuery(SEARCH_BY_GENRE, {
        variables: { name },
    });
    console.log(data);
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>NOT FOUND</p>;
    return (
        <SearchName shows={data.show} />
        )

}
export default SearchByGenre;