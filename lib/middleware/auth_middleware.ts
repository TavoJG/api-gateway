import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../modules/errors';
import environment from '../environments';

const { secretKey } = environment;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.path.startsWith('/login')) return next();

	const header = req.headers.authorization || '';

	if (!header || !header.toLowerCase().startsWith('bearer')) {
		throw new ForbiddenError('Se requiere enviar un Bearer Token en el Header');
	}

	try {
		const token = header.split(' ')[1];
		jwt.verify(token, secretKey);
	} catch (err) {
		let message = '';
		if (err instanceof TokenExpiredError) {
			message = `El token enviado expiró desde ${err.expiredAt.toString()}`;
		} else if (err instanceof JsonWebTokenError) {
			message = `Error al validar el token = ${err.message}`;
		}
		throw new UnauthorizedError(message);
	}
	return next();
};

export default authMiddleware;
