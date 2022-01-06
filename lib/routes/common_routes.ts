import { Application, Request, Response } from 'express';
import errorResponse from '../modules/errors/responses';

export default class CommonRoutes {
	public route(app: Application) {
		// URL no registrada
		app.all('*', (req: Request, res: Response) => {
			errorResponse(`La URL ${req.path} no existe`, 404, res);
		});
	}
}
