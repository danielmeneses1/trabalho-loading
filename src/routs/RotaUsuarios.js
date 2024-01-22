import Express from 'express';
import userControler from '../controllers/UserController.js';
const router = Express.Router();

router.get("/", userControler.listarUsers);
router.post("/cadastro", userControler.RegisterUser);
router.post("/login", userControler.login);
router.delete("/:id", userControler.deletarUser);

export default router;
