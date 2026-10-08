const mongoose = require("mongoose");

const itemFacturaCompraSchema = new mongoose.Schema(
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
    costoUnitario: {
      type: Number,
      required: true,
      min: [0, "El costo unitario no puede ser negativo"],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "El subtotal no puede ser negativo"],
    },
  },
  { _id: false }
);

const facturaCompraSchema = new mongoose.Schema(
  {
    numFacturaProveedor: {
      type: String,
      required: [true, "El número de factura del proveedor es obligatorio"],
      trim: true,
    },
    proveedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El proveedor es obligatorio"],
    },
    items: [itemFacturaCompraSchema],
    montoTotal: {
      type: Number,
      required: true,
      min: [0, "El monto total no puede ser negativo"],
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

facturaCompraSchema.index(
  { numFacturaProveedor: 1, proveedor: 1 },
  { unique: true }
);

const FacturaCompra = mongoose.model("FacturaCompra", facturaCompraSchema);

module.exports = FacturaCompra;