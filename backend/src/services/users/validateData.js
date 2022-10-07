// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
import { userExistsByEmail } from '../../helpers/dbValidators'

/**
 * Validate body request of create user endpoint (POST /users)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createUserValidation = () => {
    return [
        check('name').exists().withMessage('El nombre es requerido'),
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('email').custom(userExistsByEmail),
        check('password').exists().withMessage('La contraseña es requerida'),
        check('password')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/)
            .withMessage('La contraseña debe contener al menos 8 caracteres y al menos 1 número'),
    ]
}

/**
 * Validate body request of login user endpoint (POST /users/login)
 * @return	{Array}		Rules of validation (express-validator)
 */
const loginUserValidation = () => {
    return [
        check('email').exists().withMessage('El email es requerido'),
        check('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        check('password').exists().withMessage('La contraseña es requerida'),
    ]
}

export { createUserValidation, loginUserValidation }
