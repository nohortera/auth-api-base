const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get('port') || 4000

const app = express()

app.use('/api/auth', require('./routes/auth.router'))

const start = async () => {
    try {
        await mongoose.connect(config.get('databaseUrl'))
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        })
    } catch (e) {
        console.log('Something went wrong', e)
    }
}

start()

