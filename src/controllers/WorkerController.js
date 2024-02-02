import worker from "../models/worker.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class workerController{
    static async listWorkers(req, res){
        try {
            const workersList = await worker.find();
            res.status(200).json(workersList);
        } catch (error) {
            console.error(error);
            res.status(500).json({message : 'erro whe find workers'})
        }
    }

    static async registWorker(req, res){
        try {
            const {name, email, password}= req.body;

            const existinWorker = await worker.findOne({email})
            if(existinWorker){
                return res.status(401).json({message : 'Email already in use'})
            }
            const newWorker = new Worker({name, email, password})
            newWorker.password = await bcrypt.hash(newWorker.password, 10);
            await newWorker.save();
            const response = {
                mensage: 'new worker added',
                worker: {
                    name : newWorker.name,
                    email : newWorker.name,
                    id: newWorker.id
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message : 'error wen save new worker'})
        }
    }
}

export default  workerController;