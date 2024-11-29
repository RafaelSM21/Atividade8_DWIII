import mongoose from "mongoose";

const AnimalsSchema = new mongoose.Schema({
  Nome: {
    type: String,
    required: [true, "Nome é obrigatório."],
    maxlength: [30, "Nome deve ter no máximo 30 caracteres."],
    trim: true
  },
  Especie: {
    type: String,
    required: [true, "Especie é obrigatório."],
    maxlength: [30, "Especie deve ter no máximo 30 caracteres."],
    trim: true
  },
  Idade: {
    type: Number,
    required: [true, "Idade é obrigatório."],
    min: [0, "O valor não pode ser negativo."],
  },
  Tutor: {
    type: String,
    required: [true, "Tutor é obrigatório."],
    maxlength: [60, "Nome do tutor deve ter no máximo 60 caracteres."],
    trim: true
  },
});

const Animals = mongoose.model("Animais", AnimalsSchema);
export default Animals;