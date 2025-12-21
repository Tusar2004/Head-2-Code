const mongoose = require('mongoose');
const { Schema } = mongoose;

const achievementSchema = new Schema({
    badgeId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true // emoji or icon name
    },
    category: {
        type: String,
        enum: ['milestone', 'streak', 'speed', 'difficulty', 'topic', 'special', 'social'],
        required: true
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        required: true
    },
    criteria: {
        type: {
            type: String,
            required: true // 'problemCount', 'streak', 'speed', 'difficulty', 'topic', etc.
        },
        value: {
            type: Number,
            required: true
        },
        difficulty: String, // optional: for difficulty-specific badges
        topic: String, // optional: for topic-specific badges
        condition: String // optional: additional conditions
    },
    points: {
        type: Number,
        default: 10
    },
    order: {
        type: Number,
        default: 0 // for display ordering
    }
}, {
    timestamps: true
});

const Achievement = mongoose.model('achievement', achievementSchema);

module.exports = Achievement;
