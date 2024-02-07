
import rent from "../models/Rent.js";
import livro from "../models/Livro.js";
import  Jwt  from "jsonwebtoken";

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
            const { idLivro } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = Jwt.verify(token, 'segredo');
    
            if (decodedToken.exp < Date.now() / 1000) {
                return res.status(401).json({ message: 'Token expirado' });
            }
    
            const { id, email } = decodedToken;
    
            const livroDisponivel = await livro.findById(idLivro);
            if (!livroDisponivel) {
                return res.status(404).json({ message: 'Livro não disponível' });
            }

            console.log('ID do Usuário:', id);
            console.log('Email do Usuário:', email);
            const idUsuario = id;
            const emailUsuario = email;
            const nomeLivro = livroDisponivel.titulo;
    
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

        static async listarAlugueisPorUsuario(req, res) {
            try {
                const { idUsuario } = req.params;
                const ListaVendas = await rent.find({ idUsuario });
                const response = {
                    mensagem: 'Alugueis realizados pelo usuário',
                    Alugueis: ListaVendas,
                };
                res.status(200).json(ListaVendas);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Erro ao buscar alugueis' });
            }
        }
    }





export default rentController;