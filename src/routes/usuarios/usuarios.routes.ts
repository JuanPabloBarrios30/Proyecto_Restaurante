import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod,
    loginMethod
} from '../../controllers/usuarios/usuarios.controller';


const router = express.Router();

// /api/usuarios
router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', putMethod);
router.delete('/:id', deleteMethod);
router.post('/login', loginMethod);

export default router;