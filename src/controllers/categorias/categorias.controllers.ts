import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {

    try {
        const result = await prisma.categorias.findMany();
        return res.status(200).json({ data: result, messagge: "Data Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:categorias:getMethod", error)
        return res.status(500).json(error);

    }
}

const getMethodById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const categoria = await prisma.categorias.findUnique({
            where: { id: id },
            include: {
                producto: true
            }
        });
        res.status(200).json({ data: categoria, messagge: "Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:categorias:getMethodById", error)
        return res.status(500).json(error);

    }

}

const postMethod = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const result = await prisma.categorias.create({ data: body });
        return res.status(200).json({ data: result, messagge: "Successfully Created" });

    } catch (error) {
        console.log("error::controller:categorias:postMethod", error)
        return res.status(500).json(error);

    }
}

const putMethod = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const body = req.body;
    try {
        const result = await prisma.categorias.update({ 
            where: { 
                id: id
             }, 
            data: body
         });
        return res.status(200).json({ data: result, messagge: "Successfully Updated" });
    } catch (error) {
        console.log("error::controller:categorias:putMethod", error)
        return res.status(500).json(error);

    }
}

const deleteMethod = async (req: Request, res:Response)=>{
    const id: number = parseInt(req.params.id);
    try {
        const result = await prisma.categorias.delete({
            where: {
                id:id
            }
        });
        return res.status(200).json({data: result, messagge: "Successfully Deleted"});
    } catch (error) {
        console.log("error::controller:categorias:deleteMethod", error)
        return res.status(500).json(error);

    }
}

export {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod
}