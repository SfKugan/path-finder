const { threadStarter } = require('./ThreadStarter');
const bodyParser = require("body-parser");
const express = require('express');
const path = require("path");
const app = express();

const port = process.env.PORT || 3001;
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.post("/path", jsonParser, async (req, res) => {
    const result = await threadStarter(req.body.points, __dirname + '/kohonenMap/kohonenService.js');

    res.status(result.path.length ? 200 : 500).json(result).end();
})

app.get("/info", (req, res) => {
    res.send('path finder: v1.0')
})

app.listen(port, () => {
    console.log(`server has been started on port ${port}`);
});