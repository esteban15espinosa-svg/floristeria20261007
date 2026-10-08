const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: [150, "El nombre del producto no puede superar 150 caracteres"],
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría es obligatoria"],
    },
    precioVentaBase: {
      type: Number,
      required: [true, "El precio de venta base es obligatorio"],
      min: [0, "El precio base no puede ser negativo"],
    },
    costoPromedio: {
      type: Number,
      default: 0,
      min: [0, "El costo promedio no puede ser negativo"],
    },
    stockActual: {
      type: Number,
      default: 0,
      min: [0, "El stock actual no puede ser negativo"],
    },
    imagenUrl: {
      type: String,
      trim: true,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;