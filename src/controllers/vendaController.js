import venda from "../models/venda.js";
import jwt from "jsonwebtoken";

class vendaController{
    static async listarVendas(req, res) {
        try {
            const ListaVendas = await venda.find();
            res.status(200).json(ListaVendas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar vendas' });
        }
    }

    static async RealizarVenda(req, res) {
        try {
            
            const {idUsuario, emailUsuario, idLivro, nomeLivro } = req.body;

            const newVenda = new venda({ idUsuario, emailUsuario, idLivro, nomeLivro });
            await newVenda.save();
            const response = {
                mensagem: 'Venda realizada com sucesso',
                venda: {
                    idUsuario: newVenda.idUsuario,
                    emailUsuario: newVenda.emailUsuario,
                    idLivro: newVenda.idLivro,
                    nomeLivro: newVenda.nomeLivro,
                }
            };
            res.status(201).json(response);

            } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar venda' });
        }
    }
    
}

export default vendaController;