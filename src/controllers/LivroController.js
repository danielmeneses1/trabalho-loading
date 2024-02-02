import livro from "../models/Livro.js";
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

    static async seachBookByGender(req, res){
        try{
            const genero = req.params.genero;
            const livros = await livro.find({genero: genero});
            res.status(200).json(livros);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: 'error when find book' });
        }
    }

    static async searchBookById(req, res){
        try{
            const id = req.params.id;
            const livroBuscado = await livro.findById(id);
            res.status(200).json(livroBuscado);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: 'error when find book' });
        }
    }

    
}
export default livroControler;



