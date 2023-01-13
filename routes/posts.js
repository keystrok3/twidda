

const express = require('express');
const { make_entry, fetch_entries, delete_entry, edit_entry } = require('../controllers/posts');

const router = express.Router();


router.route('/makeentry').post(make_entry);

router.route('/fetchentries').get(fetch_entries);

router.route('/deleteentry/:post_id').delete(delete_entry);

router.route('/editentry/:post_id').post(edit_entry);



module.exports = router;