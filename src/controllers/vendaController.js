import Express from "express";
import rent from "../models/Rent.js";
import livro from "../models/livro.js";
const router = Express.Router();

class rentController{
    static async listarAlugueis(req, res) {
        try {
            const ListaVendas = await rent.find();
            res.status(200).json(ListaVendas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar alugueis' });
        }
    }

    
        static async RealizarAluguel(req, res) {
            try {
                const { idUsuario, emailUsuario, idLivro, nomeLivro } = req.body;

                const newRent = new rent({ idUsuario, emailUsuario, idLivro, nomeLivro });
                await newRent.save();
                const livroDeletado = await livro.findByIdAndDelete(idLivro);
                const response = {
                    mensagem: 'Aluguel realizado com sucesso',
                    AlugadoPor: {
                        idUsuario: newRent.idUsuario,
                        emailUsuario: newRent.emailUsuario,
                        idLivro: newRent.idLivro,
                        nomeLivro: livroDeletado.titulo,
                    },
                    livroAlugado: {
                        id: livroDeletado.id,
                        titulo: livroDeletado.titulo,
                        editora: livroDeletado.editora,
                        preco: livroDeletado.preco,
                    }
                };

                res.status(201).json(response);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro ao realizar venda' });
            }
        }
    }



export default rentController;