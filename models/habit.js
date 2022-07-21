const db = require('../dbConfig/init');

const User = require('./user');

class Habit {
    constructor(data) {
        this.username = data.username
        this.sleeptarget = data.sleeptarget
        this.sleepdate = data.sleepdate
        this.sleephours = data.sleephours
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT habits.*, users.username as username
                                                    FROM habits
                                                    JOIN users ON habits.userid = users.id;`);
                let habits = result.rows.map(r => new Habit(r))
                res(habits)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }

    static findByUsername(username) {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT habits.*, users.username as     username
                                                FROM habits
                                                JOIN users ON habits.userid = users.id
                                                WHERE username = $1;`, [username]);
                let habit = new Habit(result.rows[0])
                res(habit)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }

    static create(username){
        return new Promise (async (resolve, reject) => {
            try {
                let user = await User.findByUsername(username);
                let sleeptarget = null
                let sleepdate = []
                let sleephours = []
                let habitData = await db.query(`INSERT INTO habits (userid, sleeptarget, sleepdate, sleephours) VALUES ($1, $2, $3, $4) RETURNING *;`, [ user.id, sleeptarget, sleepdate, sleephours ]);
                let newHabit = new Habit(habitData.rows[0]);
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }

    static updateSleepTarget(username, sleeptarget) {
        return new Promise (async (resolve, reject) => {
            try {
                let user = await User.findByUsername(username);
                let updatedHabitData = await db.query(`UPDATE habits SET sleeptarget = $2 WHERE userid = $1 RETURNING *;`, [ user.id, sleeptarget ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating Habit');
            }
        });
    }

    static updateSleepTime(username, sleephour, sleepday) {
        return new Promise (async (resolve, reject) => {
            try {
                let user = await User.findByUsername(username);
                let updatedHabitData = await db.query(`UPDATE habits SET sleephours = array_append(sleephours, $2), sleepdate = array_append(sleepdate, $3) WHERE userid = $1 RETURNING *;`, [ user.id, sleephour, sleepday ]);
                let updatedHabit = new Habit(updatedHabitData.rows[0]);
                resolve (updatedHabit);
            } catch (err) {
                reject('Error updating Habit');
            }
        });
    }
}

module.exports = Habit
