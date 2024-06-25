const express = require("express");
const app = express();

app.get('/', (_, res) => {
    res.status(401).send("denied!");
});

app.listen(5555);