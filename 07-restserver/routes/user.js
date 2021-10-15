const { Router } = require('express')
const { check } = require('express-validator')
const { userGet,
        userPost,
        userDelete,
        userPatch,
        userPut } = require('../controllers/user')
const { isValidRole, emailExist, userIdExist } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

router.get("/", userGet)
router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExist),
    check('rol').custom(isValidRole),
    validarCampos
],userPut)
router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isValidRole),
    validarCampos
] , userPost)
router.delete("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExist),
    validarCampos
],userDelete)
router.patch("/", userPatch)

module.exports = router