

const db = require('../models/posts.js');


// Create new diary entry
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



module.exports = { make_entry };