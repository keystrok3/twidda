


const connection = require('../config/dbconfig.js');


/**
 * Adds a new entry
 * */ 
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


/**
 * Fetches all diary entries
*/

const fetchAllEntries = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM posts;'

        return connection.query(
            sql,
            (err, results) => {
                if(err) reject(err);
                resolve(results);
            }
        )
    });
};



/**
 * Deletes a diary entry
*/
const deleteEntry = (post_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM posts WHERE post_id = ?';

        return connection.query(
            sql, 
            [post_id],
            (err, results) => {
                if(err) reject(err);
                resolve(results);
            }
        )
    });
};


/**
 * A Transaction: Edits a post; In addition, records the edit separately 
*/
const editEntry = (post_id, title, body) => {
    console.log(post_id, title, body)
    return new Promise((resolve, reject) => {
        const update_sql = 'UPDATE posts SET title = ?, body = ?, edited = 1 WHERE post_id = ?;';

        connection.beginTransaction((err) => {
            if(err) return reject(err);

            connection.query(
                update_sql,
                [ post_id, title, body ],
                (err, results) => {
                    if(err) {
                        return connection.rollback((err) => {
                            return reject(err);
                        })
                    }
                    connection.commit((err) => {
                        if(err) {
                            connection.rollback(() => reject(err));
                            resolve(results);
                        }
                    })
                    connection.query(
                        'INSERT INTO edits (edit_id, post_id, title_change, body_change, time_edited) \
                            VALUES (NULL, ?, ?, ?, NULL)',
                        [ post_id, title, body ],
                        (err, results) => {
                            if(err) {
                                return connection.rollback((err) => {
                                    reject(err);
                                });
                            }
                            return connection.commit((err) => {
                                if(err) {
                                    return connection.rollback((err) => {
                                        reject(err);
                                    } )
                                }
                                resolve(results)
                            })
                        

                        }
                    )
                }
            )
        })
    });
}


module.exports = { newEntry, fetchAllEntries, deleteEntry, editEntry };