import React, { useState, useEffect } from "react";
import '../App.css';
import dropDownSort from './logic/sort'

export default function Drop_Down(props) {//Creates drop-downs by given parameters.
    const [dropDownType, setDropDownType] = useState("");//Saves the type of drop-down to create.
    const [defaultSelectedValue, setDefaultSelectedValue] = useState("");//Saving current selected value, makes checking whethter to select option or not-easier.

    function dropDownOnchange(value, dropDownType) {
        let key = ["store_region", "city"];
        let objectList = [];
        let attributeList = [];
        setDefaultSelectedValue(value);
        switch (dropDownType) {//Sort by attribute and value from all api data. Return job object list and sorted city attribute list.
            case "area":
                [objectList, attributeList] = dropDownSort(value, key[0], JSON.parse(sessionStorage.getItem("currentTable")).response);
                break;
            case "city":
                [objectList, attributeList] = dropDownSort(value, key[1], props.jobsDetails);
                break;
            default:
                break;
        }
        props.setJobsDetails(objectList);//Updates job object list to render.
        props.setDropDownArray(attributeList);//Updates a drop down list that gets by props.
    }
    const defineDropDown = async () => {//Defining useStates that need to be initialized once each render.
        setDropDownType(props.dropDownType);
    };
    useEffect(() => {
        defineDropDown();
    }, [props.dropDownArray]);
    return (
        <div>
            <form name="form1" id="form1" action="/action_page.php" >
                <label>{dropDownType}:</label>
                <select className={dropDownType} onChange={(e) => dropDownOnchange(e.target.value, dropDownType)}>
                    {
                        props.dropDownArray.map((option) => (
                            <option key={option + new Date()} selected={option === defaultSelectedValue} value={option}>{option}</option>
                        ))
                    }
                </select>
            </form>
        </div>);
}





