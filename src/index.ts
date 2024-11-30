import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection";
import routes from "./routes/AnimalsRoutes";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express(); // Cria a instância do servidor Express

// Suporte a JSON no body
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public"))); // Serve arquivos estáticos

// Conexão com o MongoDB
connect();

// Definir rotas do backend (animais)
app.use("/animais", routes);

// Middleware para rotas desconhecidas (404)
app.use("*", (_, res) => {
    res.status(404).json({ error: "Rota desconhecida" });
});

// Inicializa o servidor na porta configurada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
