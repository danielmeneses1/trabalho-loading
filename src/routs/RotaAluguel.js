import  Express  from "express";
import rentController from "../controllers/aluguelController.js";
import verificarToken from "../../middleWare/login.js";
const routerAluguel = Express.Router();

routerAluguel.get("/", rentController.listarAlugueis);
routerAluguel.post("/" //, verificarToken 
, rentController.RealizarAluguel);
routerAluguel.get("/:idUsuario", rentController.listarAlugueisPorUsuario);


export default routerAluguel;