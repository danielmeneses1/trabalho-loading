import express from 'express';
import livroControler from '../controllers/LivroController.js';
const router = express.Router();

router.get("/", livroControler.listarLivros);
router.post("/", livroControler.inserirLivro);
router.delete("/:id", livroControler.deletarLivro)

export default router;