import { Router, Request, Response, NextFunction } from "express";
import AnimalsRoutes from "./AnimalsRoutes";

const routes = Router();

// Middleware para logar todas as requisições
routes.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Rotas específicas
routes.use("/animais", AnimalsRoutes);

export default routes;
