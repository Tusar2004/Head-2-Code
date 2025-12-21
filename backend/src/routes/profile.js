const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadProfilePicture, deleteProfilePicture } = require('../controllers/profileController');
const userMiddleware = require('../middleware/userMiddleware');

// Protected routes - require authentication (must come first!)
router.get('/me', userMiddleware, getProfile);
router.put('/update', userMiddleware, updateProfile);
router.post('/upload-picture', userMiddleware, uploadProfilePicture);
router.delete('/delete-picture', userMiddleware, deleteProfilePicture);

// Public route - get any user's profile (must come after /me)
router.get('/:userId', getProfile);

module.exports = router;
