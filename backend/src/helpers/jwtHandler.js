// Dependencies
import jwt from 'jsonwebtoken'

// Token Values
import tokenConfig from '../config/jwt'

// Response Setting
import { responseError } from './response'

let verifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split('jwt ')[1]
        jwt.verify(token, tokenConfig.secret, (err, decoded) => {
            if (err) {
                const error = { msg: err }
                res.status(403).json(responseError([error]))
            } else {
                req.user = decoded
                next()
            }
        })
    } else {
        const errorInvalid = {
            msg: 'El token no está presente. Intente nuevamente.',
        }
        res.status(401).json(responseError([errorInvalid]))
    }
}

export { verifyToken }
