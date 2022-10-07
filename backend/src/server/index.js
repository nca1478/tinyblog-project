// Dependencies
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import chalk from 'chalk'

// Debugging utility
const debug = require('debug')('tinyBlog:DB')

// Api Routes
import { metricRoutes, postRoutes, userRoutes } from '../services'

// DB Connection and Associations
import sequelize from '../db/connection'
require('../db/associations')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 4000

        // Settings
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(
            logger(
                ':method :url :status :response-time ms - :res[content-length] [:date[clf]] :remote-addr',
            ),
        )

        // Bodyparser
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        // Static Files
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`${chalk.yellow('[tinyBlog-api:REST]')} Escuchando en puerto ${this.port}`)
        })
    }

    routes() {
        this.app.use('/api/v1/users', userRoutes)
        this.app.use('/api/v1/posts', postRoutes)
        this.app.use('/api/v1/metrics', metricRoutes)
    }

    startDBConnection() {
        sequelize
            .sync({ force: false })
            .then(() => {
                debug('Conexión a base de datos exitosa')
                console.log(`${chalk.yellow('[tinyBlog:DB]')} Conexión a base de datos exitosa`)
            })
            .catch(error => {
                console.log(error)
                console.log(
                    `${chalk.red('[tinyBlog:DB]')} Error de conexión a la base de datos ${error}`,
                )
            })
    }
}

module.exports = Server
