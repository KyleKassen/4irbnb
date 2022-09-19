import React from 'react';
import Navigation from "../Navigation";
import './Header.css';


function Header({isLoaded}) {

    return (
        <>
            <Navigation isLoaded={isLoaded} />
        </>
    )
}
