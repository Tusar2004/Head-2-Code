const Achievement = require('../models/achievement');

// Define all 15 badges with their criteria
const badgeDefinitions = [
    // Milestone Badges
    {
        badgeId: 'first-steps',
        name: 'First Steps',
        description: 'Solve your first problem',
        icon: '🎯',
        category: 'milestone',
        rarity: 'common',
        criteria: { type: 'problemCount', value: 1 },
        points: 10,
        order: 1
    },
    {
        badgeId: 'getting-started',
        name: 'Getting Started',
        description: 'Solve 10 problems',
        icon: '🚀',
        category: 'milestone',
        rarity: 'common',
        criteria: { type: 'problemCount', value: 10 },
        points: 25,
        order: 2
    },
    {
        badgeId: 'problem-solver',
        name: 'Problem Solver',
        description: 'Solve 50 problems',
        icon: '💪',
        category: 'milestone',
        rarity: 'rare',
        criteria: { type: 'problemCount', value: 50 },
        points: 100,
        order: 3
    },
    {
        badgeId: 'coding-master',
        name: 'Coding Master',
        description: 'Solve 100 problems',
        icon: '👑',
        category: 'milestone',
        rarity: 'epic',
        criteria: { type: 'problemCount', value: 100 },
        points: 250,
        order: 4
    },

    // Streak Badges
    {
        badgeId: 'week-warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        category: 'streak',
        rarity: 'common',
        criteria: { type: 'streak', value: 7 },
        points: 30,
        order: 5
    },
    {
        badgeId: 'month-champion',
        name: 'Month Champion',
        description: 'Maintain a 30-day streak',
        icon: '⚡',
        category: 'streak',
        rarity: 'rare',
        criteria: { type: 'streak', value: 30 },
        points: 150,
        order: 6
    },
    {
        badgeId: 'unstoppable',
        name: 'Unstoppable',
        description: 'Maintain a 100-day streak',
        icon: '💎',
        category: 'streak',
        rarity: 'legendary',
        criteria: { type: 'streak', value: 100 },
        points: 500,
        order: 7
    },

    // Difficulty Badges
    {
        badgeId: 'easy-peasy',
        name: 'Easy Peasy',
        description: 'Solve 10 easy problems',
        icon: '🌟',
        category: 'difficulty',
        rarity: 'common',
        criteria: { type: 'difficulty', value: 10, difficulty: 'easy' },
        points: 20,
        order: 8
    },
    {
        badgeId: 'medium-mastery',
        name: 'Medium Mastery',
        description: 'Solve 10 medium problems',
        icon: '🎖️',
        category: 'difficulty',
        rarity: 'rare',
        criteria: { type: 'difficulty', value: 10, difficulty: 'medium' },
        points: 75,
        order: 9
    },
    {
        badgeId: 'hard-core',
        name: 'Hard Core',
        description: 'Solve 10 hard problems',
        icon: '💀',
        category: 'difficulty',
        rarity: 'epic',
        criteria: { type: 'difficulty', value: 10, difficulty: 'hard' },
        points: 200,
        order: 10
    },

    // Topic Master Badges
    {
        badgeId: 'array-expert',
        name: 'Array Expert',
        description: 'Solve 10 array problems',
        icon: '📊',
        category: 'topic',
        rarity: 'rare',
        criteria: { type: 'topic', value: 10, topic: 'array' },
        points: 50,
        order: 11
    },
    {
        badgeId: 'tree-climber',
        name: 'Tree Climber',
        description: 'Solve 10 tree problems',
        icon: '🌲',
        category: 'topic',
        rarity: 'rare',
        criteria: { type: 'topic', value: 10, topic: 'tree' },
        points: 50,
        order: 12
    },
    {
        badgeId: 'graph-guru',
        name: 'Graph Guru',
        description: 'Solve 10 graph problems',
        icon: '🕸️',
        category: 'topic',
        rarity: 'rare',
        criteria: { type: 'topic', value: 10, topic: 'graph' },
        points: 50,
        order: 13
    },
    {
        badgeId: 'dp-dynamo',
        name: 'DP Dynamo',
        description: 'Solve 10 dynamic programming problems',
        icon: '⚙️',
        category: 'topic',
        rarity: 'epic',
        criteria: { type: 'topic', value: 10, topic: 'dp' },
        points: 75,
        order: 14
    },

    // Special Badges
    {
        badgeId: 'perfect-week',
        name: 'Perfect Week',
        description: 'Solve at least 1 problem every day for 7 days',
        icon: '✨',
        category: 'special',
        rarity: 'epic',
        criteria: { type: 'perfectWeek', value: 7 },
        points: 150,
        order: 15
    }
];

async function seedAchievements() {
    try {
        console.log('🌱 Seeding achievements...');

        // Clear existing achievements
        await Achievement.deleteMany({});
        console.log('✅ Cleared existing achievements');

        // Insert all badge definitions
        await Achievement.insertMany(badgeDefinitions);
        console.log(`✅ Successfully seeded ${badgeDefinitions.length} achievements!`);

        // Display summary
        const counts = badgeDefinitions.reduce((acc, badge) => {
            acc[badge.rarity] = (acc[badge.rarity] || 0) + 1;
            return acc;
        }, {});

        console.log('\n📊 Badge Summary:');
        console.log(`   Common: ${counts.common || 0}`);
        console.log(`   Rare: ${counts.rare || 0}`);
        console.log(`   Epic: ${counts.epic || 0}`);
        console.log(`   Legendary: ${counts.legendary || 0}`);
        console.log(`   Total: ${badgeDefinitions.length}\n`);

    } catch (error) {
        console.error('❌ Error seeding achievements:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    const mongoose = require('mongoose');

    // Use your MongoDB connection string
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/head2code';

    mongoose.connect(MONGODB_URI)
        .then(async () => {
            console.log('📦 Connected to MongoDB');
            await seedAchievements();
            await mongoose.disconnect();
            console.log('👋 Disconnected from MongoDB');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ MongoDB connection error:', error);
            process.exit(1);
        });
}

module.exports = { seedAchievements, badgeDefinitions };
