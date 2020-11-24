const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const playApps = require('./playstore.js');

const app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort by "rating" or "app"');
        }
    }

    let results = playApps
        .filter(playApp =>
            playApp
                .Rating
                );

    if(sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }

    res
        .json(results);

})

app.listen(8000, () => {
    console.log('Server started on Port 8000');
});