import { Response } from 'express';
import errorCode from './error_code';

const errorResponse = (message: string, code: number, res: Response) => {
	res.status(code).json({
		code,
		error: errorCode(code),
		message,
	});
};

export default errorResponse;
