"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)();
fastify.get('/ping', async (request, reply) => {
    reply.send({ message: 'pong' });
});
const start = async () => {
    try {
        await fastify.listen({ port: 3001 });
        console.log("Fastify server is running on http://localhost:3001");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
