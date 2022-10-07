// Dependencies
import express from 'express'

// Models
import Metric from './model'

// Post Dependencies
import MetricController from './controller'
import MetricRouter from './routes'

const dataDependencies = { metric: Metric }

// Injecting Dependencies
const router = express.Router()
const metricController = new MetricController(dataDependencies)
const metricRouter = new MetricRouter(router, metricController)
const metricRoutes = metricRouter.setRoutes()

export { metricRoutes }
