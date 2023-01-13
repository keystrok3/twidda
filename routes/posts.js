

const express = require('express');
const { make_entry } = require('../controllers/posts');

const router = express.Router();


router.route('/makeentry').post(make_entry);



module.exports = router;