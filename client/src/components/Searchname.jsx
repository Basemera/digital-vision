import React from 'react';

import { useQuery } from "@apollo/react-hooks";
import SEARCH_BY_NAME from '../queries/searchByName.js';
import { Fragment } from "react";

const Searchname = (props) => {
    console.log(props);
    const name = props.name;
    console.log(name);
    const { loading, error, data } = useQuery(SEARCH_BY_NAME, {
        variables: { name },
    });
    console.log(data);
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>NOT FOUND</p>;
    return (
        <div></div>
    )

}
export default Searchname;