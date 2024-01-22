import user from "../models/user.js";
import bcrypt from "bcrypt";

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

    static async RegisterUser(req, res) {
        try {
            const { nome, email, senha } = req.body;
    
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
                    nome: newUser.nome,  // Acesse o nome a partir de newUser, não de req.body
                    email: newUser.email,  // Acesse o email a partir de newUser, não de req.body
                    id: newUser.id,  // Acesse o id a partir de newUser, não de req.body
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
    
            const response = {
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    nome: existingUser.nome,  // Acesse o nome a partir de existingUser, não de req.body
                    email: existingUser.email,  // Acesse o email a partir de existingUser, não de req.body
                    id: existingUser.id,  // Acesse o id a partir de existingUser, não de req.body
                }
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