const express = require('express');
const bears = require('./routes/bears');
const anime = require('./routes/anime');
const path = require('path');
const app = express();


// app.use((req, res, next) => {
//     const requestURL = `${req.protocol}://${req.get('host')}`;
//     console.log(requestURL);
//     if(requestURL === process.env.REQUEST_URL) {
//         next();
//     } else {
//         res.json({message: "Sorry could not fetch"});
//     }
// });

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/anime', anime(), (req, res) => {
    res.json({data: res.data})
})

app.get('/api/bears', bears(), (req, res) => {
    res.json({ data: res.data });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
})

app.listen(5000);