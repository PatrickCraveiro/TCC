import { Baby, Bone, Brain, HeartPulse, ScanFace, Stethoscope, type LucideIcon } from "lucide-react";
import type { EspecialidadeId } from "@/lib/constants";

export const ICONES_ESPECIALIDADE: Record<EspecialidadeId, LucideIcon> = {
  "clinica-geral": Stethoscope,
  ortopedia: Bone,
  neurologia: Brain,
  cardiologia: HeartPulse,
  pediatria: Baby,
  dermatologia: ScanFace,
};
