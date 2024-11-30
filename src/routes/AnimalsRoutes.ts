import { Router } from "express";
import controller from "../controllers/AnimalsController";
import validateAnimalData from "../middlewares/animalsMiddleware"; // Importa o middleware

const routes = Router();

routes.post('/', validateAnimalData, controller.create);
routes.get('/', controller.list);
routes.get('/search', controller.search);
routes.delete('/', controller.delete);
routes.put('/', validateAnimalData, controller.update);

export default routes;
