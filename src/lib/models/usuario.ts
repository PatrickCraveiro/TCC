import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ROLES } from "@/lib/constants";

const usuarioSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Nunca sai do banco sem um `.select("+senhaHash")` explícito.
    senhaHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, required: true, default: "paciente" },
  },
  { timestamps: true },
);

export type UsuarioDoc = InferSchemaType<typeof usuarioSchema>;

export const Usuario: Model<UsuarioDoc> =
  models.Usuario ?? model<UsuarioDoc>("Usuario", usuarioSchema);
