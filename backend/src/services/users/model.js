// Dependencies
import { Model, DataTypes } from 'sequelize'

// DB Connection
import sequelize from '../../db/connection'

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            defaultValue: 'ADMIN_ROLE',
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'user',
    },
)

export default User
