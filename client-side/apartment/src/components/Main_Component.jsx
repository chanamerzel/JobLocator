import React, { useState,  useEffect } from "react";
import Table from "./Table";
import Drop_Down from "./Drop_Down";
import getArrayByKey from './logic/getArrayByKey'
import searchByInput from "./logic/searchByInput";

export default function Main_Component(props) {//Main component-gets all api data in props from app.js.
    const [searchInputValue, setSearchInputValue] = useState([]);//value of search input tag.
    const [jobsDetails, setJobsDetails] = useState([]);//The current list of job objects
    const [areas, setAreas] = useState([]);//Area down drop list.
    const [cities, setCities] = useState([]);//City down drop list.

    async function setStates() {
        setAreas(getArrayByKey("store_region", await props.allApi));//Get array of areas.
        setCities(getArrayByKey("city", jobsDetails?jobsDetails:await props.allApi));//Get arrays of cities.
        setJobsDetails(jobsDetails.length>0?jobsDetails:await props.allApi);//Set job objects.
    }
    function inputValueSearch(value) {
        setSearchInputValue(value);//Saves the value from the search input tag,for later usage.
        let list = searchByInput(value, JSON.parse(sessionStorage.getItem("currentTable")).response);//Searches from all  api data by search input value.
        setJobsDetails(list);
    }
    function setJobs(val) {//Changes jobs object list by drop_Down sorting value.
        setJobsDetails(val);
    }
    useEffect(() => {
        setStates();//Sets the useStates that have to be initialized at the first render of the component.
    }, [jobsDetails, props.allApi]);
    return (<div>
        <header>
            <h1 className="h1">JobLocator</h1>
            <input type='text' className="search_input" value={searchInputValue} onChange={(e) => inputValueSearch(e.target.value)} placeholder='search..' />
        </header>
        <form className="form-group">
            <Drop_Down  dropDownArray={areas} setDropDownArray={setCities} dropDownType="area" jobsDetails={jobsDetails} setJobsDetails={setJobs} />
            <Drop_Down  dropDownArray={cities} setDropDownArray={setCities} dropDownType="city" jobsDetails={jobsDetails} setJobsDetails={setJobs} />
        </form>

        <Table jobsDetails={jobsDetails}></Table>
    </div>);
}