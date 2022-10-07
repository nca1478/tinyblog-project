// Models
import User from '../services/users/model'
import Post from '../services/posts/model'

const userExistsByEmail = async (email = '') => {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        throw new Error(`El email ${email} ya existe`)
    }
}

const postExistsById = async id => {
    const postExists = await Post.findOne({ where: { id } })
    if (!postExists) {
        throw new Error(`El Post con el ID ${id} no existe`)
    }
}

const postExistsByState = async id => {
    const postExists = await Post.findOne({ where: { id, active: true } })
    if (!postExists) {
        throw new Error(`El Post con el ID ${id} no está activo`)
    }
}

export { userExistsByEmail, postExistsById, postExistsByState }
