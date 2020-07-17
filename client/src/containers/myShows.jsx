import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import fakeAuth from '../handlers/fakeAuth';
import AppNavBar from '../components/AppNavBar';

function MyShows({ children, ...rest}) {
    return(
        <div>
            <AppNavBar></AppNavBar>
            <Route 
                { ...rest}
                render={
                    ({location}) => fakeAuth.isAuthenticated ? (<p>We are authenticated</p>) : <Redirect to={{ pathname:"/login", state: {from: location}}}></Redirect>
                }
            />
        </div>
    )
}

export default MyShows;