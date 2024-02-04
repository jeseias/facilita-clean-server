import { app } from "./main/config/app";
import { env } from "./main/config/env";

app.listen(
  {
    port: env.PORT,
    host: '::'
  },
  (err, address) => {
    if (err) {
      throw err;
    }
    console.log("Server up and running:", address);
  }
);
