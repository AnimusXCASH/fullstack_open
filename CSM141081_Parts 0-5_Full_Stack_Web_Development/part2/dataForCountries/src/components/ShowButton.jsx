import React from 'react';

export const ShowButton = ({ country, handleShow }) => {
    return (
        <button onClick={() => handleShow(country)}>show</button>
    );
}
