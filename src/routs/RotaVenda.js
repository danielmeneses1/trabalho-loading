import  Express  from "express";
import  VendaController  from "../controllers/vendaController.js";
import verificarToken from "../../middleWare/login.js";
const routerVenda = Express.Router();

routerVenda.get("/", VendaController.listarVendas);
routerVenda.post("/", verificarToken , VendaController.RealizarVenda);


export default routerVenda;