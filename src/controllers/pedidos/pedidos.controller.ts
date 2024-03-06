import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {

    try {
        const result = await prisma.pedidos.findMany();
        return res.status(200).json({ data: result, messagge: "Data Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:pedidos:getMethod", error)
        return res.status(500).json(error);

    }
}

const getMethodById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const cliente = await prisma.pedidos.findUnique({
            where: { id: id },
            include: {
                items: true
            }
        });
        res.status(200).json({ data: cliente, messagge: "Successfully Obtained" });

    } catch (error) {
        console.log("error::controller:pedidos:getMethodById", error)
        return res.status(500).json(error);

    }

}

const postMethod = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const result = await prisma.pedidos.create({ data: body });
        return res.status(200).json({ data: result, messagge: "Successfully Created" });

    } catch (error) {
        console.log("error::controller:pedidos:postMethod", error)
        return res.status(500).json(error);

    }
}

const putMethod = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const body = req.body;
    try {
        const result = await prisma.pedidos.update({ 
            where: { 
                id: id
             }, 
            data: body
         });
        return res.status(200).json({ data: result, messagge: "Successfully Updated" });
    } catch (error) {
        console.log("error::controller:pedidos:putMethod", error)
        return res.status(500).json(error);

    }
}

const deleteMethod = async (req: Request, res:Response)=>{
    const id: number = parseInt(req.params.id);
    try {
        const result = await prisma.pedidos.delete({
            where: {
                id:id
            }
        });
        return res.status(200).json({data: result, messagge: "Successfully Deleted"});
    } catch (error) {
        console.log("error::controller:pedidos:deleteMethod", error)
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