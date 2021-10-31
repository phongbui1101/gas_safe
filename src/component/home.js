import React from 'react'
import Clock from './clock';
import Status from './status';
import Fan from './fan';
export default function Home() {
    return (
        <>
        <Clock/>
        <Status/>
        <Fan/>
        </>
    )
}
