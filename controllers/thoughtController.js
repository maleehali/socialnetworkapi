const mongoose = require('mongoose');
const { Thought, User } = require('../models');


module.exports = {
    getThoughts(req, res) {
        console.log('Fetching all thoughts...');
        Thought.find()
            .then((thoughts) => {
                console.log('Thoughts fetched successfully:', thoughts);
                res.json(thoughts);
            })
            .catch((err) => {
                console.error('Error fetching thoughts:', err);
                res.status(500).json(err);
            });
    }
    ,
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought created, but no user found with this id!' })
                    : res.json({ message: 'Thought created successfully!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : User.findOneAndUpdate(
                          { thoughts: req.params.thoughtId },
                          { $pull: { thoughts: req.params.thoughtId } },
                          { new: true }
                      )
            )
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        const { reactionId } = req.body; // Extract reactionId from the request body
        const { thoughtId } = req.params; // Extract thoughtId from the request params
    
        console.log('Received Reaction ID:', reactionId); 
        console.log('Reaction ID Length:', reactionId.length); 
    
        // Validate reactionId
        if (!mongoose.Types.ObjectId.isValid(reactionId)) {
            return res.status(400).json({ message: 'Invalid reactionId format' });
        }
    
        Thought.findOneAndUpdate(
            { _id: thoughtId }, 
            { $pull: { reactions: { reactionId: new mongoose.Types.ObjectId(reactionId) } } }, // Correct usage of new ObjectId
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thought);
            })
            .catch((err) => {
                console.error('Error removing reaction:', err);
                res.status(500).json(err);
            });
    }
}    