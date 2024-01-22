import livro from "../models/livro.js";
class livroControler{

    static async listarLivros(req, res) {
        try {
            const ListaLivros = await livro.find();
            res.status(200).json(ListaLivros);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar livros' });
        }
    }

    static async inserirLivro(req, res) {
        try {
            const novoLivro = new livro(req.body);
            const livroSalvo = await novoLivro.save();
            res.status(201).json(livroSalvo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar livro' });
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            const livroDeletado = await livro.findByIdAndDelete(id);
            res.status(200).json(livroDeletado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar livro' });
        
        }
    }
}


export default livroControler;



