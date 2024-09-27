import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createHandler } from 'graphql-http/lib/use/express'
import Connect from './repo/connect'
import { RootSchema } from './graphql'

function Main() {
    try {
        require('dotenv').config()
        const app = express()
        const port = process.env.PORT || 3100

        // app.use(express.static('public'))
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(express.static('public'))
        app.use(morgan('dev'))
        app.use(
            cors({
                credentials: true,
                origin: '*'
            })
        )

        app.use(
            '/graphql',
            createHandler({
                schema: RootSchema,
                context: (req) => req
            })
        )

        app.listen(port, async () => {
            console.log(`Server is running at http://localhost:${port}`)
            await Connect() // Connect to your database
        })
    } catch (error) {
        console.log('Startup error:', error)
    }
}

Main()
