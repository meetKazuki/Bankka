import app from './app';
import logger from './config/logger';

process.on('uncaughtException', e => {
  logger.debug(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  logger.debug(e);
  process.exit(1);
});

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV);

const server = app.listen(app.get('port'), () => {
  logger.debug(
    `server running on http://localhost:${app.get('port')} in ${app.get('env')} mode`
  );
  logger.debug('Press CTRL-C to stop');
});

export default server;
