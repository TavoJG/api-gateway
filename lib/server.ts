import env from './environments';
import App from './app';
import logger from './config/logger';

const { app } = new App();

const PORT = env.port;

logger.info(`Ambiente: ${env.env}`);

app.listen(PORT, () => {
	logger.info(`Servidor escuchando en el puerto ${env.port}`);
});

process.on('unhandledRejection', (reason: Error) => {
	logger.error(`Ambiente: ${env.env}`);
	logger.error('Unhandled Promise Rejection: reason:', reason.message);
	logger.error(reason.stack);
	// application specific logging, throwing an error, or other logic here
});
