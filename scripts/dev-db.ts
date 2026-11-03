// Sobe um MongoDB local para desenvolvimento, sem instalar nada no sistema.
// Os dados ficam em .mongo-data/ e sobrevivem entre execuções.
//   npm run db:dev
import { mkdirSync } from "node:fs";
import { MongoMemoryServer } from "mongodb-memory-server";

const PORTA = Number(process.env.MONGO_PORTA ?? 27017);
const DB_PATH = ".mongo-data";

async function main() {
  mkdirSync(DB_PATH, { recursive: true });
  const servidor = await MongoMemoryServer.create({
    instance: { port: PORTA, dbPath: DB_PATH, storageEngine: "wiredTiger" },
  });

  console.log(`MongoDB local rodando em ${servidor.getUri()}medquery`);
  console.log("Use essa URI em MONGODB_URI no .env.local. Ctrl+C para parar.");

  const parar = async () => {
    await servidor.stop({ doCleanup: false });
    process.exit(0);
  };
  process.on("SIGINT", parar);
  process.on("SIGTERM", parar);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
