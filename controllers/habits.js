const jwt = require("jsonwebtoken")

const Habit = require('../models/habit');

async function index (req, res) {
    try {
        const posts = await Habit.all
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function fetchUsername (req, res) {
    try {
        const user = await Habit.findByUsername(req.body.username)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

async function sleepTarget (req, res) {
    try {
        const user = await Habit.updateSleepTarget(req.body.username, req.body.sleeptarget)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

async function sleepTime (req, res) {
    try {
        console.log(req.body)
        const user = await Habit.updateSleepTime(req.body.username, req.body.sleephour, req.body.sleepday)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

module.exports = {
    index,
    fetchUsername,
    sleepTime,
    sleepTarget
}
