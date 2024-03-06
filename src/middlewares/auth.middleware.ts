import { NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

function verify(req: Request, res: Response, next: NextFunction){
    const token:any = req.headers.token;
    res.setHeader("Content-Type", "application/json")

    if(token == null){
        return res.status(401).json({message: "Token Obligatorio"})
    }
    jwt.verify(token, SECRET_KEY, (err: any, decoded:any) => {
        if(err){
            return res.status(500).json({message: "Token Inválido"})
        }

        return next();
    })

}

export{
    verify
}