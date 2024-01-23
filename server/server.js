const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 3003;
app.use(cors());
const url = 'https://mcdonalds-live-engage-api-stage-1.azurewebsites.net/stores.json';
const axios = require('axios');

app.get('/api/getAll', async(req, res) => { //Request for fetching api data and passing it to client.
    axios.get(url)
        .then(response => {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(error => {
            console.error(error);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});