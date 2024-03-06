import express from 'express';
import categoriasRouter from './categorias/categorias.routes';
import clientesRouter from './clientes/clientes.routes';
import pedidosRouter from './pedidos/pedidos.routes';
import productosRouter from './productos/productos.routes';
import usuariosRouter from './usuarios/usuarios.routes';

const router = express.Router();

// /api/
router.use('/categorias', categoriasRouter);
router.use('/clientes', clientesRouter);
router.use('/pedidos', pedidosRouter);
router.use('/productos', productosRouter);
router.use('/usuarios', usuariosRouter);

export default router;