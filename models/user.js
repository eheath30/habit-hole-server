const db = require('../dbconfig');

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.passwordDigest = data.password_digest
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users;`);
                let users = result.rows.map(r => new User(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err.message}`)
            }
        })
    }

    static create({ username, password }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (username, password_digest)
                                                VALUES ($1, $2) RETURNING *;`, [username, password]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err.message}`)
            }
        })
    }

    static findByUsername(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users
                                                WHERE username = $1;`, [username]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }
}

module.exports = User;
