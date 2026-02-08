import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { assertEnv, env } from "./config/env.js";

async function bootstrap() {
  assertEnv();
  await connectDb();

  const app = createApp();
  app.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`));
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
