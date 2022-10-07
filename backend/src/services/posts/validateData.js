// Dependencies
import { check, oneOf } from 'express-validator'

// Helpers
import { postExistsById, postExistsByState } from '../../helpers/dbValidators'

/**
 * Validate body request of create user endpoint (POST /posts)
 * @return	{Array}		Rules of validation (express-validator)
 */
const createPostValidation = () => {
    return [
        check('title').exists().withMessage('El título es requerido'),
        check('summary').exists().withMessage('El resumen es requerido'),
        check('body').exists().withMessage('El cuerpo es requerido'),
    ]
}

/**
 * Validate body request of get user endpoint (GET /posts/:id)
 * @return	{Array}		Rules of validation (express-validator)
 */
const findByIdPostValidation = () => {
    return [
        check('id', 'No es un UUID correcto').isUUID(),
        check('id').custom(postExistsById),
        check('id').custom(postExistsByState),
    ]
}

export { createPostValidation, findByIdPostValidation }
