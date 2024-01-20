import Express from 'express';
import userControler from '../controllers/UserController.js';
const router = Express.Router();

router.get("/", userControler.listarUsers);
router.post("/", userControler.inserirUser);
router.delete("/:id", userControler.deletarUser);

export default router;