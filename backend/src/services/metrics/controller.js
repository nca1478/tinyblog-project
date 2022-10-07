// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'

// Service Class
import MetricService from './service'

class MetricController extends MetricService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async updateVisits(req, res) {
        try {
            const result = await this.updateBlogVisits()

            if (!result) {
                const error = responseError({
                    msg: 'Error actualizando número de visitas del blog.',
                })
                return res.status(401).json(error)
            } else {
                const response = responsePOST({
                    result,
                    msg: 'Número de visitas del blog actualizado exitosamente.',
                })
                return res.status(200).json(response)
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async getVisits(req, res) {
        try {
            const result = await this.getBlogVisits()
            const response = responseGET(null, result)
            return res.status(200).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default MetricController
