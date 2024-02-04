import { Client } from "pg";

export const connectToDb = async () => {
  const pgClient = new Client({
    user: "facilta",
    host: "localhost",
    database: "facilta",
    password: "facilta",
    port: 5432,
  });

  try {
    await pgClient.connect();

    return { pgClient };
  } catch (error) {
    console.log(error);
  } finally {
    await pgClient.end();
  }
};
