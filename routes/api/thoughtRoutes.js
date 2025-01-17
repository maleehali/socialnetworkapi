const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// GET all thoughts and POST a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// GET, PUT, and DELETE a single thought by _id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// POST reactions by thoughtId
router.route('/:thoughtId/reactions')
    .post(addReaction);

// DELETE a reaction by thoughtId and reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
