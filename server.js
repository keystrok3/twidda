
require('dotenv').config({ path: './.env'});
const express = require('express');


const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(express.json());


// Diary Entry routes
app.post('/makeentry', require('./routes/posts.js'));
app.get('/fetchentries', require('./routes/posts.js'));
app.delete('/deleteentry/:post_id', require('./routes/posts.js'));
app.post('/editentry/:post_id', require('./routes/posts.js'));




const server = app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error ${err}`);
    server.close(() => process.exit(1));
});