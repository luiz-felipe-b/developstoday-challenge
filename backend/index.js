const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/countries', async (req, res) => {
    const avaliableCountries = process.env.AVAILABLE_COUNTRIES_API
    await axios.get(avaliableCountries)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

app.get('/countryInfo/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode;

    const borderCountriesUrl = process.env.BORDER_COUNTRIES_API + countryCode;
    const borderCountries = await axios.get(borderCountriesUrl)

    const flagImages = await axios.get(process.env.FLAG_IMAGES_API)
    const flag = flagImages.data.data.find(country => country.name === borderCountries.data.commonName)

    const population = await axios.get(process.env.POPULATION_COUNTRY_API)

    const info = {borderCountries: borderCountries.data.borders, flagUrl: flag.flag, populationHistory: population.data.data.find(country => country.iso3 === flag.iso3)}
    res.status(200).send(info);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
