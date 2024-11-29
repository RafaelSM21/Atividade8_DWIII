import { Request, Response, NextFunction } from "express";
import Animals from "../models/Animals";

class AnimalsController {
    // Create
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { Nome, Especie, Idade, Tutor } = req.body;
        try {
            const newAnimal = new Animals({ Nome, Especie, Idade, Tutor });
            const savedAnimal = await newAnimal.save();
            res.status(201).json(savedAnimal);
        } catch (error: any) {
            next(error);
        }
    }

    // List All
    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const animals = await Animals.find().sort({ Nome: 1 }); // Ordena por nome
            res.json(animals);
        } catch (error: any) {
            next(error);
        }
    }

    // Search by Name or Species
    public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { query } = req.query; // Obtém o parâmetro de busca
        try {
            const results = await Animals.find({
                $or: [
                    { Nome: { $regex: query, $options: "i" } }, // Busca parcial no nome
                    { Especie: { $regex: query, $options: "i" } } // Busca parcial na espécie
                ]
            });
            res.json(results);
        } catch (error: any) {
            next(error);
        }
    }

    // Update
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id, Nome, Especie, Idade, Tutor } = req.body;
        try {
            const animal = await Animals.findById(id);
            if (!animal) {
                res.status(404).json({ message: "Animal não encontrado!" });
                return;
            }
            animal.Nome = Nome;
            animal.Especie = Especie;
            animal.Idade = Idade;
            animal.Tutor = Tutor;
            const updatedAnimal = await animal.save();
            res.json(updatedAnimal);
        } catch (error: any) {
            next(error);
        }
    }

    // Delete
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.body;
        try {
            const deletedAnimal = await Animals.findByIdAndDelete(id);
            if (!deletedAnimal) {
                res.status(404).json({ message: "Animal não encontrado!" });
                return;
            }
            res.json({ message: "Animal excluído com sucesso!" });
        } catch (error: any) {
            next(error);
        }
    }
}

export default new AnimalsController();
