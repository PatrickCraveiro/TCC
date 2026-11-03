import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ESPECIALIDADE_IDS, STATUS_CONSULTA } from "@/lib/constants";

const consultaSchema = new Schema(
  {
    paciente: { type: Schema.Types.ObjectId, ref: "Usuario", required: true, index: true },
    clinica: { type: Schema.Types.ObjectId, ref: "Clinica", required: true },
    especialidade: { type: String, enum: ESPECIALIDADE_IDS, required: true },
    sintomas: { type: [String], default: [] },
    observacoes: { type: String, trim: true, maxlength: 500 },
    data: { type: Date, required: true }, // início da consulta (UTC)
    status: { type: String, enum: STATUS_CONSULTA, required: true, default: "agendada" },
  },
  { timestamps: true },
);

// Um horário só pode ter uma consulta ativa por clínica. Consultas canceladas
// liberam o horário, por isso o índice é parcial.
consultaSchema.index(
  { clinica: 1, data: 1 },
  { unique: true, partialFilterExpression: { status: "agendada" } },
);

export type ConsultaDoc = InferSchemaType<typeof consultaSchema>;

export const Consulta: Model<ConsultaDoc> =
  models.Consulta ?? model<ConsultaDoc>("Consulta", consultaSchema);
