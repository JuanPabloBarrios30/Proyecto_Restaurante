import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_EXPIRES } from "../../config";

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {

    try {
        const result = await prisma.usuarios.findMany();
        return res.status(200).json({ data: result, messagge: "Data Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:usuarios:getMethod", error)
        return res.status(500).json(error);

    }
}

const getMethodById = async (req: Request, res: Response) => {
    
    try {
        const {id} = req.params;
        const cliente = await prisma.usuarios.findUnique({
            where: { id: id }
        });
        res.status(200).json({ data: cliente, messagge: "Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:usuarios:getMethodById", error)
        return res.status(500).json(error);

    }

}

const postMethod = async (req: Request, res: Response) => {
    const body = req.body;
    const isExists = await prisma.usuarios.findUnique({
        where:{
            correo: body.correo
        }
    })

    if(isExists){
        return res.status(400).json({message: "El correo ya existe"})
    }

    const passwordHashed = await bcrypt.hashSync(body.clave, 10);
    body.clave = passwordHashed
    try {
        const result = await prisma.usuarios.create({ data: body });
        return res.status(200).json({ data: result, messagge: "Successfully Created" });

    } catch (error) {
        console.log("error::controller:usuarios:postMethod", error)
        return res.status(500).json(error);

    }
}

const putMethod = async (req: Request, res: Response) => {
    const {id} = req.params;
    const body = req.body;
    try {
        const result = await prisma.usuarios.update({
            where: {
                id: id
            },
            data: body
        });
        return res.status(200).json({ data: result, messagge: "Successfully Updated" });
    } catch (error) {
        console.log("error::controller:usuarios:putMethod", error)
        return res.status(500).json(error);

    }
}

const deleteMethod = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.usuarios.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({ data: result, messagge: "Successfully Deleted" });
    } catch (error) {
        console.log("error::controller:usuarios:deleteMethod", error)
        return res.status(500).json(error);

    }
}

const loginMethod = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const user = await prisma.usuarios.findFirst({ where: { correo: body.correo } });
        if (user) {
            const isValidPassword = bcrypt.compareSync(body.clave, user.clave)
            if (!isValidPassword) {
                return res.status(401).json({ data: null, message: "Email or password is incorrect" });
            }

            const payload = {
                id: user.id,
                correo: user.correo,
                nombre: user.nombres,
                apellido: user.apellidos
            }

            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES })
            return res.status(200).json({ jwt: token, message: "Login Successfully" })
        }
        return res.status(401).json({ data: null, message: "The entered email not exists" });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod,
    loginMethod
}