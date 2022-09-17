import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllSpots} from '../../store/spot';
import './Spots.css';


function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        null
    )
}

export default Spots;
