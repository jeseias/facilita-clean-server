import { env } from "./main/config/env";
import { connectToDb } from "./main/database/connect-to-db";

// export const { pgClient } = connectToDb();

// Promise.allSettled([pgClient])
//   .then(async () => {
//     const { setUpApp } = await import("./main/config/app");
//     const app = setUpApp();

//     app
//       .listen({
//         host: "0.0.0.0",
//         port: env.PORT,
//       })
//       .then(() => console.log("server is running", env.PORT));
//   })
//   .catch((err) => {
//     throw err;
//   });

const init = async () => {
  const { pgClient } = await connectToDb();

  pgClient.on("error", (error) => {
    console.log("DB Error ==>==>==>", error);
  });

  const { setUpApp } = await import("./main/config/app");
  const app = setUpApp();

  app
    .listen({
      host: "0.0.0.0",
      port: env.PORT,
    })
    .then(() => console.log("server is running", env.PORT));

  return {};
};

export const {} = init();
