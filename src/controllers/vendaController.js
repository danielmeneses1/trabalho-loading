
import rent from "../models/Rent.js";
import livro from "../models/Livro.js";

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

                const livroDisponivel = await livro.findById(idLivro);
                if (!livroDisponivel) {
                    return res.status(404).json({ message: 'Livro não disponível' });
                }

                const newRent = new rent({ idUsuario, emailUsuario, idLivro, nomeLivro });
                await newRent.save();
                const livroAlugado = await livro.findByIdAndDelete(idLivro);
                const response = {
                    mensagem: 'Aluguel realizado com sucesso',
                    AlugadoPor: {
                        idUsuario: newRent.idUsuario,
                        emailUsuario: newRent.emailUsuario,
                        idLivro: newRent.idLivro,
                        nomeLivro: livroAlugado.titulo,
                    },
                    livroAlugado: {
                        id: livroAlugado.id,
                        titulo: livroAlugado.titulo,
                        editora: livroAlugado.editora,
                        preco: livroAlugado.preco,
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