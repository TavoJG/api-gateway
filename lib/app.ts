import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/error_handler';
import authMiddleware from './middleware/auth_middleware';
import ServiceRoutes from './routes/services_routes';
import CommonRoutes from './routes/common_routes';

class App {
	public app: express.Application;

	// Registro de rutas
	private serviceRoutes = new ServiceRoutes();

	private commonRoutes = new CommonRoutes();

	constructor() {
		this.app = express();
		this.config();
		this.serviceRoutes.route(this.app);
		this.commonRoutes.route(this.app);
		this.app.use(errorHandler);
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(authMiddleware);
	}
}

export default App;
