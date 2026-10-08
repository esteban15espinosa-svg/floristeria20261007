const mongoose = require("mongoose");

const itemFacturaVentaSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, "La cantidad debe ser al menos 1"],
    },
    precioAplicado: {
      type: Number,
      required: true,
      min: [0, "El precio aplicado no puede ser negativo"],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "El subtotal no puede ser negativo"],
    },
  },
  { _id: false }
);

const facturaVentaSchema = new mongoose.Schema(
  {
    numFactura: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El cliente es obligatorio"],
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
    },
    pedidoOrigen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PedidoOnline",
    },
    items: [itemFacturaVentaSchema],
    totalNeto: {
      type: Number,
      required: true,
      min: [0, "El total neto no puede ser negativo"],
    },
    saldoPendiente: {
      type: Number,
      required: true,
      min: [0, "El saldo pendiente no puede ser negativo"],
    },
    estadoPago: {
      type: String,
      enum: {
        values: ["PENDIENTE", "PARCIAL", "PAGADO", "ANULADO"],
        message: "{VALUE} no es un estado de pago válido",
      },
      default: "PENDIENTE",
    },
  },
  {
    timestamps: true,
  }
);

const FacturaVenta = mongoose.model("FacturaVenta", facturaVentaSchema);

module.exports = FacturaVenta;