import express from 'express';
const router = express.Router();
import livro from '../models/livro.js'; 

router.get('/', async (req, res) => {
    const page = req.body.page || 1;
    const perPage = req.body.perPage || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
  
    const Livros = await livro.find();
    const PagBook = Livros.slice(startIndex, endIndex);
  
    res.status(200).json({
      livros: PagBook,
      currentPage: page,
      totalPages: Math.ceil(Livros.length / perPage)
    });
});

export default router;