export default function searchByInput(value, list) { //Search in object list for specific text.
    let response = []
    list.forEach(object => {
        for (let key in object) {
            if (object[key].toString().includes(value)) {
                response.push(object)
            }
        }
    });
    return response
}