const express = require('express');
const dotenv = require('dotenv');
const { connectToDb } = require('./services/dbService');
const routes = require('./routes/router');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

connectToDb().then((data) => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
});
