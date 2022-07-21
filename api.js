const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use(cors('*'));
app.use(express.json());

const userRoutes = require('./routes/users')
const habitsRoutes = require('./routes/habits')
const authRoutes = require('./routes/auth')

app.use('/habits', habitsRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome' }));
module.exports = app
