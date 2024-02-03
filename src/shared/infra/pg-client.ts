import { Client } from "node-postgres";

export let pgClient: Client;

(async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "password",
    port: 5432,
  });

  await client.connect();
  pgClient = client;

  return client;
})();
