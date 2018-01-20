import mongoose from 'mongoose'
import config from '../config'

mongoose.Promise = require('bluebird')

export default function connectDatabase () {
    mongoose.set('debug', true)
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    })
    mongoose.connection.on('error', (error) => {
        console.log(error)
    })
    mongoose.connection.on('open', () => {
        console.log('MongoDB has been connected successfully!')
    })
}