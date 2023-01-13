
const express = require('express');


const app = express();


app.get('/', (req, res) => {
    res.send()
})




const server = app.listen(5000, () => {
    console.log(`http://127.0.0.1:${5000}`);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error ${err}`);
    server.close(() => process.exit(1));
});