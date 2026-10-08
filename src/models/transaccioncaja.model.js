const mongoose = require("mongoose");

const transaccionCajaSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: {
        values: ["INGRESO", "GASTO"],
        message: "{VALUE} no es un tipo de transacción válido",
      },
      required: [true, "El tipo de transacción es obligatorio"],
    },
    monto: {
      type: Number,
      required: [true, "El monto es obligatorio"],
      min: [0.01, "El monto debe ser mayor a 0"],
    },
    concepto: {
      type: String,
      required: [true, "El concepto de la transacción es obligatorio"],
      trim: true,
      maxlength: [200, "El concepto no puede superar 200 caracteres"],
    },
    refFacturaVenta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacturaVenta",
    },
    refFacturaCompra: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacturaCompra",
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TransaccionCaja = mongoose.model(
  "TransaccionCaja",
  transaccionCajaSchema
);

module.exports = TransaccionCaja;