import  Express  from "express";
import rentController from "../controllers/aluguelController.js";
const routerAluguel = Express.Router();

routerAluguel.get("/", rentController.listarAlugueis);
routerAluguel.post("/", rentController.RealizarAluguel);
routerAluguel.get("/:idUsuario", rentController.listarAlugueisPorUsuario);


export default routerAluguel;