import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Em serverless (Vercel) e no hot reload do `next dev` o módulo é reavaliado
// várias vezes; guardar a conexão no globalThis evita abrir uma por requisição.
const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};
const cache = (globalForMongoose.mongooseCache ??= { conn: null, promise: null });

export async function connectDB() {
  if (cache.conn) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI não definida. Copie .env.example para .env.local.");
  }

  cache.promise ??= mongoose.connect(uri, { bufferCommands: false });
  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  return cache.conn;
}
