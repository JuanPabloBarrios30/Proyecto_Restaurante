import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod,
    loginUser
} from '../../controllers/usuarios/usuarios.controller';
import {verify} from "../../middlewares/auth.middleware";

const router = express.Router();

// /api/usuarios
router.get('/', verify, getMethod);
router.get('/:id', verify, getMethodById);
router.post('/', postMethod);
router.put('/:id', verify, putMethod);
router.delete('/:id', verify, deleteMethod);
router.post('/login', loginUser);

export default router;