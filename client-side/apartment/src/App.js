import react from 'react-dom';
import React, { useState, useEffect, useCallback } from "react";
import './App.css';
import Main_Component from './components/Main_Component';


function App() {
    const [allApi, setAllApi] = useState([])
    async function apiCall() { //Gets all data from api.
        try {

            const url = 'http://localhost:3003/api/getAll';
            let response = await fetch(url);
            response = await response.json()
            sessionStorage.setItem("currentTable", JSON.stringify({ response: response.flat() })); //Save all data in sessionStorage fore later usage.
            setAllApi(response)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        apiCall()
    }, []);
    return ( <
        div className = "App" >

        <
        Main_Component allApi = { allApi } > < /Main_Component> < /
        div >
    );
}
export default App;