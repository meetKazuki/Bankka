import debug from 'debug';
import http from 'http';
import app from './app';

const DEBUG = debug('dev');
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (error: Error) => {
  DEBUG(error);
  process.exit(1);
});

const server = http.createServer(app);
server.listen(PORT, () => {
  DEBUG(
    `app running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode...\npress CTRL-C to stop🔥`,
  );
});

export default server;
