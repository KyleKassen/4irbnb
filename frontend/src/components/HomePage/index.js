import React, { useEffect } from 'react';
import Spots from '../Spots';
import {useDispatch} from 'react-redux';
import {deleteSpot} from '../../store/spot';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleteSpot())
    }, [dispatch])
    return (
        <>
        <Spots />
        </>
    )
}

export default HomePage;
