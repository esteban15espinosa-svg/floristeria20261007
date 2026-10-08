const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      unique: true,
      trim: true,
      maxlength: [100, "El nombre de la categoría no puede superar 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [300, "La descripción no puede superar 300 caracteres"],
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;