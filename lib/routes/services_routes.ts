import proxy from 'express-http-proxy';
import { Application } from 'express';
import configFileLoader from '../config/config_file_loader';
import RouteConfig from '../modules/service_routes/interfaces';

class ServiceRoutes {
	private routeConfig: RouteConfig[];

	constructor() {
		this.routeConfig = configFileLoader();
	}

	public route(app: Application) {
		this.routeConfig.forEach((route) => app.use(route.path, proxy(route.baseUri)));
	}
}

export default ServiceRoutes;
