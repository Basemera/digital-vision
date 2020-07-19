import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import AppNavBar from '../components/AppNavBar';
import IS_LOGGED_IN from '../queries/isLoggedIn'
import { useQuery } from 'react-apollo'



function MyShows({ children, ...rest}) {
    const{data} = useQuery(IS_LOGGED_IN)
    return(
        <div>
            <AppNavBar></AppNavBar>
            <Route 
                { ...rest}
                render={
                    ({location}) => data.isLoggedIn ? (<p>We are authenticated</p>) : <Redirect to={{ pathname:"/login", state: {from: location}}}></Redirect>
                }
            />
        </div>
    )
}

export default MyShows;