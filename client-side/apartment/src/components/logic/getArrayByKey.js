export default function getArrayByKey(key, jobsDetails) { //Get array of certain attribute/key without duplicates.
    const set = new Set();
    for (let job of jobsDetails) {
        set.add(job[key]);
    }
    let response = []
    for (let index of set) {
        response.push(index)
    }
    return response;
}