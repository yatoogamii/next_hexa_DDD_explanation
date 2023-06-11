import fastify from "fastify";

// Require the framework and instantiate it
export const server = fastify();
// Declare a route
server.get("/", async () => {
  return { hello: "world" };
});

server.post("/post", async (req, reply) => {
  return reply.code(404).send();
});

export const startAPI = async () => {
  try {
    await server.listen({ port: 6000 });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const stopAPI = async () => {
  await server.close();
};
