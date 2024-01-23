export default function dropDownSort(value, type, jobsDetails) { //Sending data to sorting functions and getting back two lists.
    let objectsList = []
    let attributesList = []
    switch (type) {
        case "store_region":
            objectsList = sortJobsDetailsByAreaOrCity(value, "store_region", jobsDetails);
            break;
        case "city":
            objectsList = sortJobsDetailsByAreaOrCity(value, "city", jobsDetails);
            break;
        default:
            break;
    }
    attributesList = sortByAttribute("city", objectsList)
    return [objectsList, attributesList]
};

function sortJobsDetailsByAreaOrCity(value, key, jobsDetails) { //Returns object list sorted by given attribute.
    return jobsDetails.filter(job => job[key].trim() === value.trim());
}

function sortByAttribute(key, jobsDetails) { //Returns list of specific attribute without duplicates.
    let response = []
    jobsDetails.forEach(job => {
        if (!response.includes(job[key].trimEnd())) {
            response.push(job[key].trimEnd())
        }
    });
    return response
}