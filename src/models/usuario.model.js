const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema(
  {
    telefono: {
      type: String,
      trim: true,
      maxlength: [20, "El teléfono no puede superar 20 caracteres"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un correo electrónico válido",
      ],
    },
  },
  { _id: false }
);

const direccionSchema = new mongoose.Schema(
  {
    calle: {
      type: String,
      trim: true,
      maxlength: [150, "La calle no puede superar 150 caracteres"],
    },
    ciudad: {
      type: String,
      trim: true,
      maxlength: [100, "La ciudad no puede superar 100 caracteres"],
    },
    departamento: {
      type: String,
      trim: true,
      maxlength: [100, "El departamento no puede superar 100 caracteres"],
    },
  },
  { _id: false }
);

const usuarioSchema = new mongoose.Schema(
  {
    nombreRazonSocial: {
      type: String,
      required: [true, "El nombre o razón social es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [150, "El nombre no puede superar 150 caracteres"],
    },

    tipo: {
      type: String,
      required: [true, "El tipo de usuario es obligatorio"],
      enum: {
        values: ["CLIENTE", "PROVEEDOR", "EMPLEADO"],
        message: "{VALUE} no es un tipo de usuario válido",
      },
    },

    rol: {
      type: String,
      enum: {
        values: ["ADMIN", "EMPLEADO", "CLIENTE"],
        message: "{VALUE} no es un rol válido",
      },
      default: "CLIENTE",
    },

    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un correo electrónico válido",
      ],
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false,
    },

    documento: {
      type: String,
      required: [true, "El documento de identidad o NIT es obligatorio"],
      unique: true,
      trim: true,
      maxlength: [25, "El documento no puede superar 25 caracteres"],
    },

    contacto: {
      type: contactoSchema,
      default: {},
    },

    direccion: {
      type: direccionSchema,
      default: {},
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;