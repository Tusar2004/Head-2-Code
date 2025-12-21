const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    getAllAchievements,
    getUserAchievements,
    getBadgeProgress,
    markNotificationSeen,
    getUnseenBadges
} = require('../controllers/achievementController');

// Public route - get all available achievements
router.get('/', getAllAchievements);

// Protected routes - require authentication
router.get('/user/:userId', getUserAchievements);
router.get('/progress', userMiddleware, getBadgeProgress);
router.get('/unseen', userMiddleware, getUnseenBadges);
router.post('/seen/:badgeId', userMiddleware, markNotificationSeen);

module.exports = router;
