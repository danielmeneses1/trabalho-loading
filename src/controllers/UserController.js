import { response } from "express";
import user from "../models/user.js";
import bcrypt from "bcrypt";

// Rest of your code...

class userControler{

    static async listarUsers(req, res) {
        try {
            const ListaUsers = await user.find();
            res.status(200).json(ListaUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar users' });
        }
    }

    static async cadastrarUser(req, res) {
        try {
            const novoUser = new user(req.body);
            novoUser.senha = await bcrypt.hash(novoUser.senha, 10);
            await novoUser.save();
            const response = {
                mensagem: 'Usuário criado com sucesso',
                usuario: {
                    nome: req.body.nome,
                    email: req.body.email,
                    id: req.body.id,
                }}
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar user' });
        }
    }

    static async deletarUser(req, res) {
        try {
            const id = req.params.id;
            const userDeletado = await user.findByIdAndDelete(id);
            res.status(200).json(userDeletado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar user' });
        
        }
    }
}

export default userControler;