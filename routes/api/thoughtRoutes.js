const router = require('express').Router();
const {
    createThought,
    getThoughts,
    updateThought,
    getThoughtById,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//update a thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

//reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction); 

module.exports = router;