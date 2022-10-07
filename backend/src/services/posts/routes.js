// Helpers
import { showValErrors } from '../../middlewares/showValErrors'
import { verifyToken } from '../../helpers/jwtHandler'

// Validate Data
import { createPostValidation, findByIdPostValidation } from './validateData'

class PostRouter {
    constructor(router, controller) {
        this.error = new Error()

        if (!router) {
            this.error.dependencyError = 'Express Router is undefined'
            throw this.error.dependencyError
        } else {
            this.router = router
        }

        if (!controller) {
            this.error.dependencyError = 'Controller is undefined'
            throw this.error.dependencyError
        } else {
            this.controller = controller
        }

        // Create New Post
        this.router.post(
            '/',
            [verifyToken, createPostValidation(), showValErrors],
            this.controller.create.bind(this.controller),
        )

        // Search Posts
        this.router.get('/search', this.controller.search.bind(this.controller))

        // Get Posts (Published/Unpublish)
        this.router.get('/published', this.controller.findAllbyPub.bind(this.controller))

        // Get Last Posts
        this.router.get('/lastposts', this.controller.lastPosts.bind(this.controller))

        // Get Posts (Admin Dashboard)
        this.router.get(
            '/',
            [verifyToken, showValErrors],
            this.controller.findAll.bind(this.controller),
        )

        // Get Post by ID
        this.router.get(
            '/:id',
            [findByIdPostValidation(), showValErrors],
            this.controller.findById.bind(this.controller),
        )

        // Update Post
        this.router.put(
            '/:id/update',
            [verifyToken, findByIdPostValidation(), createPostValidation(), showValErrors],
            this.controller.update.bind(this.controller),
        )

        // Update Num Visits
        this.router.put('/:id/visits', this.controller.updateVisits.bind(this.controller))

        // Publish/Unpublish Post
        this.router.put(
            '/:id/publish',
            [verifyToken, findByIdPostValidation(), showValErrors],
            this.controller.publish.bind(this.controller),
        )

        // Delete Post
        this.router.delete(
            '/:id',
            [verifyToken, findByIdPostValidation(), showValErrors],
            this.controller.delete.bind(this.controller),
        )
    }

    setRoutes() {
        return this.router
    }
}

export default PostRouter
