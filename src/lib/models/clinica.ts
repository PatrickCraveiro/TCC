import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const clinicaSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    cnpj: { type: String, required: true, unique: true }, // normalizado, sem máscara
    cidade: { type: String, required: true, trim: true },
    bairro: { type: String, required: true, trim: true },
    cep: { type: String, required: true }, // 8 dígitos
  },
  { timestamps: true },
);

clinicaSchema.index({ nome: 1 });

export type ClinicaDoc = InferSchemaType<typeof clinicaSchema>;

export const Clinica: Model<ClinicaDoc> =
  models.Clinica ?? model<ClinicaDoc>("Clinica", clinicaSchema);
