const mongoose = require("mongoose");

const itemPedidoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidadSolicitada: {
      type: Number,
      required: true,
      min: [1, "La cantidad solicitada debe ser al menos 1"],
    },
    cantidadEmpaquetada: {
      type: Number,
      default: 0,
      min: [0, "La cantidad empaquetada no puede ser negativa"],
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: [0, "El precio unitario no puede ser negativo"],
    },
  },
  { _id: false }
);

const pedidoOnlineSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El cliente es obligatorio"],
    },
    origen: {
      type: String,
      enum: {
        values: ["WEB", "WHATSAPP"],
        message: "{VALUE} no es un origen válido",
      },
      default: "WEB",
    },
    items: [itemPedidoSchema],
    montoTotalEst: {
      type: Number,
      required: true,
      min: [0, "El monto estimado no puede ser negativo"],
    },
    estadoEmpaque: {
      type: String,
      enum: {
        values: ["PENDIENTE", "EN_PROCESO", "EMPAQUETADO", "CANCELADO"],
        message: "{VALUE} no es un estado de empaque válido",
      },
      default: "PENDIENTE",
    },
    notasInternas: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PedidoOnline = mongoose.model("PedidoOnline", pedidoOnlineSchema);

module.exports = PedidoOnline;