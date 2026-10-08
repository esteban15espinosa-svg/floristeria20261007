const mongoose = require("mongoose");

const entregaSchema = new mongoose.Schema(
  {
    facturaVenta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacturaVenta",
      required: [true, "La factura de venta asociada es obligatoria"],
      unique: true,
    },
    repartidor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
    },
    direccionEntrega: {
      calle: { type: String, required: true },
      ciudad: { type: String, required: true },
      departamento: { type: String, required: true },
    },
    estadoEntrega: {
      type: String,
      enum: {
        values: ["PENDIENTE", "EN_RUTA", "ENTREGADO", "NO_ENTREGADO"],
        message: "{VALUE} no es un estado de entrega válido",
      },
      default: "PENDIENTE",
    },
    fechaHoraEntregaReal: {
      type: Date,
    },
    observaciones: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entrega = mongoose.model("Entrega", entregaSchema);

module.exports = Entrega;