const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El usuario asociado es obligatorio"],
      unique: true,
    },
    cargo: {
      type: String,
      required: [true, "El cargo del empleado es obligatorio"],
      trim: true,
      maxlength: [100, "El cargo no puede superar 100 caracteres"],
    },
    salario: {
      type: Number,
      required: [true, "El salario es obligatorio"],
      min: [0, "El salario no puede ser negativo"],
    },
    fechaContratacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;