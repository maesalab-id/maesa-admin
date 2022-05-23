import jsonServer from 'json-server';
import generator from './app/generator';

const server = jsonServer.create();
const router = jsonServer.router(generator());
const middlewares = jsonServer.defaults();

const PORT = 4300;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
