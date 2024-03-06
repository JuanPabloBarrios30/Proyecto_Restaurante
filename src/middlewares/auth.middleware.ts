import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

function verify(req: Request, res: Response, next: NextFunction) {

    if(req.originalUrl == '/api/usuarios' && req.method == 'POST') return next();
    if(req.originalUrl == '/api/usuarios/login' && req.method == 'POST') return next();

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token Obligatorio" })
    }

    const tokenHandler = authorization.replace('Bearer ', '');

    jwt.verify(tokenHandler, SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(500).json({ message: "Token Inválido" })
        }

        return next();
    })

}

export {
    verify
}