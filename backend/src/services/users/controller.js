// Dependencies
import bcrypt from 'bcryptjs'

// Helpers
import { responseError, responseGET, responsePOST } from '../../helpers/response'
import { sendTokenUser } from '../../helpers/sendToken'

// Service Class
import UserService from './service'

class UserController extends UserService {
    constructor(dependenciesData) {
        super(dependenciesData)
        this.error = new Error()
    }

    async create(req, res) {
        try {
            const dataUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                role: req.body.role,
            }
            const result = await this.createUser(dataUser)
            const response = responsePOST({
                msg: 'Usuario creado exitosamente.',
                user: result,
                token: sendTokenUser(result),
            })
            return res.status(201).json(response)
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }

    async login(req, res) {
        try {
            const dataLogin = {
                email: req.body.email,
                password: req.body.password,
            }
            let result = await this.loginUser(dataLogin)
            if (result) {
                const data = {
                    msg: 'Login Exitoso.',
                    user: result,
                    token: sendTokenUser(result),
                }
                const response = responsePOST(data)
                return res.status(200).json(response)
            } else {
                if (result === null) {
                    const error = responseError({
                        msg: 'El email no existe o el usuario no está activo',
                    })
                    return res.status(404).json(error)
                } else {
                    const error = responseError({
                        msg: 'La combinación de email y contraseña no existe',
                    })
                    return res.status(401).json(error)
                }
            }
        } catch (err) {
            const error = responseError([err])
            res.status(500).json(error)
        }
    }
}

export default UserController
