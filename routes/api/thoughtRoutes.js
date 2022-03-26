const router = require('express').Router();
const {
    createThought,
    getThoughts,
    updateThought,
    getThoughtById,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//update a thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

module.exports = router;