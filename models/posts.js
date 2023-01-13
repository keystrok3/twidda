


const connection = require('../config/dbconfig.js');


// Adds a new entry
const newEntry = (title, body) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO posts (post_id, title, body, time_posted) VALUES (NULL, ?, ?, NULL)';

        return connection.query(
            sql,
            [title, body],
            (err, results) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
        );
    });
};


module.exports = {newEntry};