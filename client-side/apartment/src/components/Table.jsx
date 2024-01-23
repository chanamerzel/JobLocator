import React, { useState, useEffect } from "react";

export default function Table(props) {//Creating a table.
    const [titles, setTitles] = useState([]);
    const [jobsDetails, setJobsDetails] = useState(props.jobsDetails ? props.jobsDetails : JSON.parse(sessionStorage.getItem("currentTable")).response);
    
    const defineTitleArray = async () => {//Finding the titles/headers of the table.
        setJobsDetails(props.jobsDetails ? await props.jobsDetails : jobsDetails);
        let titlesArray = [];
        for (const key in jobsDetails[0]) {
            titlesArray.push(key);
        }
        setTitles(titlesArray);
    };

    useEffect(() => {
        defineTitleArray();
    }, [jobsDetails, props.jobsDetails]);

    return (<div >
        <table border="1px">
            <thead>
                <tr>
                    {//Running throw the titles list and making a table header from each one.
                        props.jobsDetails ? titles.map((title, i) =>
                        (
                            < th key={new Date() + title}>{title}</th>
                        )) :
                            < th ></th>

                    }
                </tr>
            </thead>
            <tbody>
                
                {jobsDetails ? props.jobsDetails.map((jobDetail, i) =>//Filling cells in table.
                (<tr key={new Date() + i}>
                    {titles.map((title) => (
                        <td key={new Date() + i + title}>"{String(jobDetail[title])}"</td>
                    ))}
                </tr>
                )
                ) : <tr></tr>}
            </tbody>
        </table>
    </div >);
}