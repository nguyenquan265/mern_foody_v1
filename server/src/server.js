import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './config/env'
import router from './routes'
import { connectDB } from './config/mongodb'
import { errorMiddleware } from './middlewares/error.middleware'
import { corsOptions } from './config/cors'
import job from './cron'

job.start()
const app = express()
app.use(cors(corsOptions))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1', router)
app.use(errorMiddleware)

if (env.BUILD_MODE === 'prod') {
  app.listen(process.env.PORT, async () => {
    await connectDB()

    console.log(`Pro: Server is running on port ${process.env.PORT}`)
  })
} else {
  app.listen(env.PORT, async () => {
    await connectDB()

    console.log(`Dev: Server is running on port ${env.PORT}`)
  })
}
