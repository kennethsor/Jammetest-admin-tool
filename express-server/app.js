const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>  {
    res.send("<h2>It's Working!</h2>")
});

app.get('updateConfig', (req,res) => {
    res.send("Whatever...");
})

app.listen(PORT, () => {
    console.log('REST is listening on port: ' + PORT);
});