export const ROLES = ["admin", "paciente"] as const;
export type Role = (typeof ROLES)[number];

export const CARGOS = [
  "Médico(a)",
  "Enfermeiro(a)",
  "Recepcionista",
  "Administrativo",
  "Auxiliar de serviços gerais",
  "Desenvolvedor(a)",
] as const;
export type Cargo = (typeof CARGOS)[number];

export const ESPECIALIDADES = [
  {
    id: "clinica-geral",
    nome: "Clínica geral",
    descricao: "Mal-estar, febre, check-up e dores em geral",
  },
  {
    id: "ortopedia",
    nome: "Ortopedia",
    descricao: "Fraturas, entorses e dores nas articulações",
  },
  {
    id: "neurologia",
    nome: "Neurologia",
    descricao: "Dor de cabeça, tontura e formigamento",
  },
  {
    id: "cardiologia",
    nome: "Cardiologia",
    descricao: "Pressão alta, palpitações e dor no peito",
  },
  {
    id: "pediatria",
    nome: "Pediatria",
    descricao: "Atendimento para crianças e adolescentes",
  },
  {
    id: "dermatologia",
    nome: "Dermatologia",
    descricao: "Manchas, alergias e problemas de pele",
  },
] as const;
export type EspecialidadeId = (typeof ESPECIALIDADES)[number]["id"];
export const ESPECIALIDADE_IDS = ESPECIALIDADES.map((e) => e.id) as [
  EspecialidadeId,
  ...EspecialidadeId[],
];

export function nomeEspecialidade(id: string) {
  return ESPECIALIDADES.find((e) => e.id === id)?.nome ?? id;
}

export const SINTOMAS = [
  "Febre",
  "Tontura",
  "Náusea",
  "Dor de cabeça",
  "Dor no corpo",
  "Tosse",
  "Falta de ar",
  "Cansaço",
  "Outro",
] as const;

// Grade fixa de atendimento, de segunda a sexta (horário de Brasília).
export const HORARIOS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;
export type Horario = (typeof HORARIOS)[number];

// Até quantos dias à frente o paciente pode agendar.
export const JANELA_AGENDAMENTO_DIAS = 60;

export const STATUS_CONSULTA = ["agendada", "realizada", "cancelada"] as const;
export type StatusConsulta = (typeof STATUS_CONSULTA)[number];
