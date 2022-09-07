const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const express = require('express')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ email, password: hashedPassword })
        user.save()

        res.json({ message: 'User has been created' })
    } catch (e) {
        console.log(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Invalid login or password' })
        }

        const check = bcrypt.compare(password, user.password)

        if (!check) {
            return res.status(400).json({ message: 'Invalid login or password' })
        }

        const token = jwt.sign({ id: user.id, email: user.email }, config.get('secretKey'), { expiresIn: '1h' })

        res.json({ token })

    } catch (e) {
        console.log(e)
    }
})

module.exports = router