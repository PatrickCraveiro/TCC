import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { CARGOS } from "@/lib/constants";

const funcionarioSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, unique: true }, // 11 dígitos
    email: { type: String, required: true, lowercase: true, trim: true },
    cargo: { type: String, enum: CARGOS, required: true },
    clinica: { type: Schema.Types.ObjectId, ref: "Clinica", required: true, index: true },
    dataContratacao: { type: Date, required: true },
  },
  { timestamps: true },
);

export type FuncionarioDoc = InferSchemaType<typeof funcionarioSchema>;

export const Funcionario: Model<FuncionarioDoc> =
  models.Funcionario ?? model<FuncionarioDoc>("Funcionario", funcionarioSchema);
