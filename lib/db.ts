import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bhojon-bilash";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Quick timeout so fallback triggers promptly if DB is not running
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        return m;
      })
      .catch((err) => {
        console.warn("MongoDB connection failed or skipped, falling back to JSON data:", err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.conn = null;
  }

  return cached.conn;
}
