import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


class userControler{

    static validatePassword(password) {
        if(!validator.isLength(password, {min: 8})){
            return false;
        }
        return true;
    }

    static async listarUsers(req, res) {
        try {
            const ListaUsers = await user.find();
            res.status(200).json(ListaUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar users' });
        }
    }

    static async RegisterUser(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if(!userControler.validatePassword(senha)){
                return res.status(401).json({ message: 'A senha precisa ter mais de 8 digitos' });
            }
            const existingUser = await user.findOne({ email });
            if (existingUser) {
                return res.status(401).json({ message: 'Email já em uso' });
            }
            const newUser = new user({ nome, email, senha });
            newUser.senha = await bcrypt.hash(newUser.senha, 10);
            await newUser.save();
            const response = {
                mensagem: 'Usuário criado com sucesso',
                usuario: {
                    nome: newUser.nome, 
                    email: newUser.email, 
                    id: newUser.id, 
                }
            };
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar usuário' });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
    
            const existingUser = await user.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ message: 'Email não cadastrado' });
            }
            const senhaValida = await bcrypt.compare(senha, existingUser.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: 'Senha inválida' });
            }
            const token = jwt.sign({ id: existingUser._id , email : existingUser.email}, "segredo", { expiresIn: '1h' });
            const response = {
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    nome: existingUser.nome, 
                    email: existingUser.email, 
                    id: existingUser.id,
                }, token: token 
            };
            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao realizar login' });
        }
    }

    static async deletarUser(req, res) {
        try {
            const id = req.params.id;
            const userRemoved = await user.findByIdAndDelete(id);
            res.status(200).json(userRemoved);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar user' });
        
        }
    }
}

export default userControler;