import user from "../models/user.js";

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

    static async inserirUser(req, res) {
        try {
            const novoUser = new user(req.body);
            const userSalvo = await novoUser.save();
            res.status(201).json(userSalvo);
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