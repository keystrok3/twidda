

const db = require('../models/posts.js');


/**
 * Create new diary entry.
 * Responds with a message of success or failuer of make the database request
 * */ 
const make_entry = async (req, res) => {
    const { title, body } = req.body;

    console.log(title, body);
    try {
        const entry = await db.newEntry(title, body);

        console.log(entry);
        res.json({
            msg: 'New Entry Made'
        });
    } catch (error) {
        console.error(error);
        res.json({
            msg: 'Could not post'
        }).status(500);
    }
};


/**
 * Fetches all diary entries
 * Responds with an array of diary entry objects or a failure message
 * */ 
const fetch_entries = async (req, res) => {
    try {
        const entries = await db.fetchAllEntries();
        console.log(entries);
        res.json({
            entries: entries
        })
    } catch (error) {
        res.json({
            msg: 'Could not fetch posts'
        })
        .status(500);
    }
};


/**
 * Sends a request to delete a database entry
 * Responds with a success message or failure message
*/
const delete_entry = async (req, res) => {
    const { post_id } = req.params;

    try {
        const deletedEntry = await db.deleteEntry(parseInt(post_id));

        console.log(deletedEntry);

        res.json({ msg: 'Successfull'}).status(200);
    } catch (error) {
        console.error(error);
        res.json({
            msg: 'Could not delete'
        })
        .status(500);
    }
};


/**
 * Sends a request to change database entry of a given id
 * 
*/
const edit_entry = async (req, res) => {
    const { post_id } = req.params;
    const { title, body } = req.body;
    console.log(post_id, title, body)

    try {
        const editedentry = await db.editEntry(parseInt(post_id), title, body);

        console.log(editedentry);

        res.json({
            msg: 'Successful'
        }).status(200);
    } catch (error) {
        console.error(error);
        res.json({
            msg: 'Could not edit'
        })
        .status(500);
    }
}



module.exports = { make_entry, fetch_entries, delete_entry, edit_entry };