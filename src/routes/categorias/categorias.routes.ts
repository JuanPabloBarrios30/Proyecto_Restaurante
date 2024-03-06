import express from 'express';
import {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod
} from '../../controllers/categorias/categorias.controllers';

const router = express.Router();

// /api/categorias
router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', putMethod);
router.delete('/:id', deleteMethod);

export default router;