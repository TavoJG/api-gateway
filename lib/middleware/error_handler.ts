import { Request, Response, NextFunction } from 'express';

import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
	ForbiddenError,
	InternalError,
} from '../modules/errors';
import errorResponse from '../modules/errors/responses';
import logger from '../config/logger';

// eslint-disable-next-line
const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof BadRequestError) {
		return errorResponse(error.message, 400, res);
	}
	if (error instanceof UnauthorizedError) {
		return errorResponse(error.message, 401, res);
	}
	if (error instanceof ForbiddenError) {
		return errorResponse(error.message, 403, res);
	}
	if (error instanceof NotFoundError) {
		return errorResponse(error.message, 404, res);
	}
	if (error instanceof InternalError || error instanceof Error) {
		logger.error(error);
		return errorResponse(error.message, 500, res);
	}

	logger.error(error);
	return res.status(500).send(`Error interno del servidor: ${error}`);
};

export default errorHandler;
