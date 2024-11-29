import { Router } from "express";
import controller from "../controllers/AnimalsController";

const routes = Router();

routes.post('/', controller.create);
routes.get('/', controller.list);
routes.get('/', controller.search);
routes.delete('/', controller.delete);
routes.put('/', controller.update);

export default routes;

