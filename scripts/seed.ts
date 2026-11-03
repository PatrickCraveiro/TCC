// Popula o banco com dados de exemplo.
//   npm run seed            -> só roda se o banco estiver vazio
//   npm run seed -- --force -> apaga tudo e recria
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Usuario } from "@/lib/models/usuario";
import { Clinica } from "@/lib/models/clinica";
import { Funcionario } from "@/lib/models/funcionario";
import { Consulta, type ConsultaDoc } from "@/lib/models/consulta";
import { CARGOS, ESPECIALIDADES, HORARIOS, SINTOMAS } from "@/lib/constants";
import { chaveDia, combinarDiaHora, diaDaSemana, somarDias } from "@/lib/datas";
import { digitosVerificadoresCNPJ, digitosVerificadoresCPF } from "@/lib/format";

try {
  process.loadEnvFile(".env.local");
} catch {
  // Sem .env.local: usa as variáveis do ambiente.
}

// Gerador pseudoaleatório com semente fixa, para o seed ser reproduzível.
let semente = 2021;
const aleatorio = () => ((semente = (semente * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
const sortear = <T,>(lista: readonly T[]) => lista[Math.floor(aleatorio() * lista.length)];
const numeros = (n: number) => Array.from({ length: n }, () => Math.floor(aleatorio() * 10)).join("");

const gerarCPF = () => {
  const base = numeros(9);
  return base + digitosVerificadoresCPF(base);
};
const gerarCNPJ = () => {
  const base = numeros(8) + "0001";
  return base + digitosVerificadoresCNPJ(base);
};

const CLINICAS = [
  { nome: "Clínica Santo Paulo", bairro: "Vila Mariana", cidade: "São Paulo", cep: "04101000" },
  { nome: "Hospital Visconde de Nicolau", bairro: "Pinheiros", cidade: "São Paulo", cep: "05422010" },
  { nome: "Clínica Maria da Graça", bairro: "Tatuapé", cidade: "São Paulo", cep: "03310000" },
  { nome: "Centro Médico Santa Fé", bairro: "Centro", cidade: "Santo André", cep: "09010160" },
  { nome: "Policlínica Nova Esperança", bairro: "Jardim do Mar", cidade: "São Bernardo do Campo", cep: "09750650" },
];

const NOMES = [
  "Ana Beatriz Souza", "Bruno Henrique Lima", "Carla Mendes", "Diego Fernandes", "Eduarda Rocha",
  "Felipe Araújo", "Gabriela Nunes", "Heitor Carvalho", "Isabela Martins", "João Pedro Alves",
  "Larissa Gomes", "Marcos Vinícius Dias", "Natália Ribeiro", "Otávio Pereira", "Paula Cristina Melo",
  "Rafael Barbosa", "Sofia Teixeira", "Thiago Moreira",
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Defina MONGODB_URI no .env.local.");
  const forcar = process.argv.includes("--force");

  await mongoose.connect(uri);
  console.log(`Conectado a ${mongoose.connection.host}/${mongoose.connection.name}`);

  const existentes = await Usuario.countDocuments();
  if (existentes && !forcar) {
    console.log(`O banco já tem ${existentes} usuário(s). Use "npm run seed -- --force" para recriar.`);
    return;
  }

  await Promise.all([
    Usuario.deleteMany({}),
    Clinica.deleteMany({}),
    Funcionario.deleteMany({}),
    Consulta.deleteMany({}),
  ]);
  await Promise.all([
    Usuario.syncIndexes(),
    Clinica.syncIndexes(),
    Funcionario.syncIndexes(),
    Consulta.syncIndexes(),
  ]);

  const senhaAdmin = process.env.SEED_ADMIN_SENHA ?? "admin123";
  const senhaPaciente = process.env.SEED_PACIENTE_SENHA ?? "paciente123";

  await Usuario.create({
    nome: "Administrador",
    login: "admin",
    email: "admin@medquery.dev",
    senhaHash: await bcrypt.hash(senhaAdmin, 10),
    role: "admin",
  });

  const hashPaciente = await bcrypt.hash(senhaPaciente, 10);
  const pacientes = await Usuario.create([
    { nome: "Paciente Demonstração", login: "paciente", email: "paciente@medquery.dev" },
    ...NOMES.slice(12).map((nome) => {
      const login = nome.split(" ")[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      return { nome, login, email: `${login}@exemplo.com` };
    }),
  ].map((p) => ({ ...p, senhaHash: hashPaciente, role: "paciente" as const })));

  const clinicas = await Clinica.create(CLINICAS.map((c) => ({ ...c, cnpj: gerarCNPJ() })));

  const hoje = chaveDia(new Date());
  await Funcionario.create(
    NOMES.slice(0, 12).map((nome, i) => {
      const primeiro = nome.split(" ")[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      return {
        nome,
        cpf: gerarCPF(),
        email: `${primeiro}.${i}@medquery.dev`,
        cargo: i < 5 ? "Médico(a)" : sortear(CARGOS),
        clinica: clinicas[i % clinicas.length]._id,
        dataContratacao: combinarDiaHora(somarDias(hoje, -Math.floor(aleatorio() * 1500) - 30), "12:00"),
      };
    }),
  );

  // Consultas entre 30 dias atrás e 21 dias à frente, só em dias úteis.
  const ocupados = new Set<string>();
  const consultas: Omit<ConsultaDoc, "observacoes" | "createdAt" | "updatedAt">[] = [];
  for (let tentativa = 0; consultas.length < 45 && tentativa < 500; tentativa++) {
    const dia = somarDias(hoje, Math.floor(aleatorio() * 52) - 30);
    if ([0, 6].includes(diaDaSemana(dia))) continue;
    const hora = sortear(HORARIOS);
    const clinica = sortear(clinicas);
    const chave = `${clinica._id}-${dia}-${hora}`;
    if (ocupados.has(chave)) continue;

    const data = combinarDiaHora(dia, hora);
    const passou = data.getTime() < Date.now();
    // As primeiras consultas são do paciente de demonstração, para o painel dele não ficar vazio.
    const paciente = consultas.length < 6 ? pacientes[0] : sortear(pacientes);
    ocupados.add(chave);
    consultas.push({
      paciente: paciente._id,
      clinica: clinica._id,
      especialidade: sortear(ESPECIALIDADES).id,
      sintomas: [sortear(SINTOMAS), sortear(SINTOMAS)].filter((s, i, a) => a.indexOf(s) === i),
      data,
      status: passou
        ? aleatorio() < 0.8 ? "realizada" : "cancelada"
        : aleatorio() < 0.9 ? "agendada" : "cancelada",
    });
  }
  await Consulta.create(consultas);

  console.log(
    `Seed concluído: ${clinicas.length} clínicas, 12 funcionários, ${pacientes.length} pacientes, ${consultas.length} consultas.`,
  );
  console.log(`  admin    / ${senhaAdmin}`);
  console.log(`  paciente / ${senhaPaciente}`);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
