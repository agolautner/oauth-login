require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const code = req.body.code; //finding the authorization code sent by the frontend

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', { // exchanging the authorization code for a token
          'code': code,
          'client_id': '145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com',
          'client_secret': process.env.CLIENT_SECRET,
          'redirect_uri': 'http://localhost:3000/callback',
          'grant_type': 'authorization_code'
        })
        // response.data should be an object with an id_token key;
        const decoded = jwt.decode(response.data.id_token); // we cannot verify this token as it's signed by google, but we can decode it
        console.log(decoded);

        const userId = decoded.sub;
        jwt.sign({ id: userId}, process.env.JWT_SECRET);
        res.json(token);

    } catch (error) {
        console.log(error.response)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})