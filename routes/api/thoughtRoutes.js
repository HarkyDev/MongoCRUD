const router = require('express').Router();
const {
    createThought,
    getThoughts
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

module.exports = router;