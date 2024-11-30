import { Request, Response, NextFunction } from "express";

const validateAnimalData = (req: Request, res: Response, next: NextFunction): void => {
  const { Nome, Especie, Idade, Tutor } = req.body;

  // Validações
  if (!Nome || typeof Nome !== "string" || Nome.trim().length === 0) {
    res.status(400).json({ error: "O campo 'Nome' é obrigatório e deve ser uma string válida." });
    return;
  }

  if (!Especie || typeof Especie !== "string" || Especie.trim().length === 0) {
    res.status(400).json({ error: "O campo 'Especie' é obrigatório e deve ser uma string válida." });
    return;
  }

  if (Idade === undefined || typeof Idade !== "number" || Idade < 0) {
    res.status(400).json({ error: "O campo 'Idade' é obrigatório e deve ser um número não negativo." });
    return;
  }

  if (!Tutor || typeof Tutor !== "string" || Tutor.trim().length === 0) {
    res.status(400).json({ error: "O campo 'Tutor' é obrigatório e deve ser uma string válida." });
    return;
  }

  // Dados válidos
  next();
};

export default validateAnimalData;
