const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");

require("dotenv").config();
const PORT: any = process.env.PORT || 5000;

import chatHandler from "./routes/chatHandler";
import checkAuthHandler from "./routes/checkAuthHandler";
import loginHandler from "./routes/loginHandler";
import logoutHandler from "./routes/logoutHandler";
import signupHandler from "./routes/signupHandler";
import usersHandler from "./routes/usersHandler";

fastify.register(fastifyCors, { origin: "*" });

fastify.post("/api/login", loginHandler);
fastify.get("/api/checkAuth", checkAuthHandler);
fastify.post("/api/logout", logoutHandler);
fastify.post("/api/signup", signupHandler);
fastify.get("/api/users", usersHandler);
fastify.post("/api/chat", chatHandler);

const startServer = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`Server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
