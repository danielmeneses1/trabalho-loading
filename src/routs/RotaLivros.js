import express from 'express';
import livroControler from '../controllers/LivroController.js';
const router = express.Router();

router.get("/", livroControler.listarLivros);
router.post("/", livroControler.inserirLivro);
router.delete("/:id", livroControler.deletarLivro)
router.get("/genero/:genero", livroControler.seachBookByGender);
router.get("/:id", livroControler.searchBookById);

export default router;