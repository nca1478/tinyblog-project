import Sequelize from 'sequelize'
const Op = Sequelize.Op

const queryPostsList = (userId, user, paginationData) => {
    const { limit, skip } = paginationData
    return {
        where: { userId, active: true },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        distinct: true,
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email', 'role'],
            },
        ],
        limit,
        offset: skip,
    }
}

const querySearchPosts = (search, user) => {
    return {
        where: {
            title: search ? { [Op.like]: '%' + search + '%' } : { [Op.ne]: null },
            published: true,
            active: true,
        },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email', 'role'],
            },
        ],
    }
}

const queryPostsPublished = (status, user, paginationData) => {
    const { limit, skip } = paginationData
    return {
        where: { published: status, active: true },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        distinct: true,
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email', 'role'],
            },
        ],
        limit,
        offset: skip,
    }
}

const queryLastPosts = (limit, user) => {
    return {
        where: { published: true, active: true },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email', 'role'],
            },
        ],
        limit,
    }
}

const queryPostById = (postId, user) => {
    return {
        where: { id: postId, active: true },
        attributes: { exclude: ['userId'] },
        include: [
            {
                model: user,
                as: 'user',
                attributes: ['id', 'name', 'email', 'role'],
            },
        ],
    }
}

export { queryPostsList, queryPostById, querySearchPosts, queryPostsPublished, queryLastPosts }
