const mongoose = require("mongoose");

const preciosClienteSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El cliente es obligatorio"],
    },
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: [true, "El producto es obligatorio"],
    },
    precioPactado: {
      type: Number,
      required: [true, "El precio pactado es obligatorio"],
      min: [0, "El precio pactado no puede ser negativo"],
    },
  },
  {
    timestamps: true,
  }
);

// Un cliente solo puede tener un precio pactado por producto
preciosClienteSchema.index({ cliente: 1, producto: 1 }, { unique: true });

const PreciosCliente = mongoose.model("PreciosCliente", preciosClienteSchema);

module.exports = PreciosCliente;