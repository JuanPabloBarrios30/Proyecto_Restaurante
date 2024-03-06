import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod
} from '../../controllers/productos/productos.controller';

const router = express.Router();

// /api/productos
router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', putMethod);
router.delete('/:id', deleteMethod);

export default router;