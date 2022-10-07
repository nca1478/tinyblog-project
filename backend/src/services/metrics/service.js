import Sequelize from 'sequelize'
const Op = Sequelize.Op

class MetricService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.metric) {
            this.error.dependencyError = 'Metric Model is undefined'
            throw this.error.dependencyError
        } else {
            this.metric = dependenciesData.metric
        }
    }

    async updateBlogVisits() {
        let numVisits = 0

        try {
            const count = await this.metric.count()
            if (count === 0) {
                const newMetric = await this.metric.create({ blogNumVisits: 1 })
                return newMetric
            } else {
                const metric = await this.metric.findOne({
                    where: { id: { [Op.ne]: null } },
                })

                numVisits = metric.dataValues.blogNumVisits + 1

                await this.metric.update(
                    { blogNumVisits: numVisits },
                    { where: { id: metric.dataValues.id } },
                )
                return { id: metric.id, blogNumVisits: numVisits }
            }
        } catch (err) {
            throw err
        }
    }

    async getBlogVisits() {
        try {
            const metric = await this.metric.findOne({
                where: { id: { [Op.ne]: null } },
            })

            return metric.dataValues
        } catch (err) {
            throw err
        }
    }
}

export default MetricService
