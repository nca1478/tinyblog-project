// Dependencies
import express from 'express'

// Models
import Post from './model'
import User from '../users/model'

// Post Dependencies
import PostController from './controller'
import PostRouter from './routes'

const dataDependencies = { post: Post, user: User }

// Injecting Dependencies
const router = express.Router()
const postController = new PostController(dataDependencies)
const postRouter = new PostRouter(router, postController)
const postRoutes = postRouter.setRoutes()

export { postRoutes }
