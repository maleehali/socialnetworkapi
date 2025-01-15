const { Schema, model } = require('mongoose');
const dayjs = require('dayjs'); // Import dayjs for formatting timestamps
const reactionSchema = require('./Reaction'); // Import Reaction schema from Reaction.js
const thoughtSchema = new Schema(
    
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dayjs(timestamp).format('MMM DD, YYYY [at] h:mm A'), // Format the timestamp
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Embed the Reaction schema here
    },
    {
        toJSON: { getters: true, virtuals: true },
        id: false,
    }
);

// Virtual property to count reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
