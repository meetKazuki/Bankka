import http from 'http';
import app from './app';
import logger from './config/logger';

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
  logger.debug(
    `app running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode...press CTRL-C to stop🔥`,
  );
});

export default server;
