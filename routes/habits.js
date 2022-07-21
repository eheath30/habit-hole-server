const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.index);
router.post('/fetchUsername', habitsController.fetchUsername);
router.post('/updateSleepTarget', habitsController.sleepTarget);
router.post('/updateSleepTime', habitsController.sleepTime);

module.exports = router;
