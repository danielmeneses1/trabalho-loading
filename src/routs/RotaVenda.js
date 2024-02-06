import  Express  from "express";
import rentController from "../controllers/vendaController.js";
import verificarToken from "../../middleWare/login.js";
const routerVenda = Express.Router();

routerVenda.get("/", rentController.listarAlugueis);
routerVenda.post("/", verificarToken , rentController.RealizarAluguel);
routerVenda.get("/:idUsuario", rentController.listarAlugueisPorUsuario);


export default routerVenda;