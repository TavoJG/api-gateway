import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import environment from '../../../lib/environments';
import authMiddleware from '../../../lib/middleware/auth_middleware';
import { ForbiddenError, UnauthorizedError } from '../../../lib/modules/errors';

describe('Auth Middleware Test', () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	const nextFunction: NextFunction = jest.fn();

	beforeEach(() => {
		mockRequest = {
			path: '',
			headers: {},
		};
		mockResponse = {
			json: jest.fn(),
		};
	});

	it('Should allow access to login routes', async () => {
		mockRequest = {
			path: '/login',
		};
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
		expect(nextFunction).toBeCalled();
	});

	it('Should not allow access without Bearer Token', async () => {
		expect(() =>
			authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
		).toThrow(ForbiddenError);
	});

	it('Should not allow access with an non Bearer Token', async () => {
		mockRequest.headers = { authorization: 'Simple sdfdf' };
		expect(() =>
			authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
		).toThrow(ForbiddenError);
	});

	it('Should not allow access with an invalid Bearer Token', async () => {
		mockRequest.headers = { authorization: 'Bearer sdfdf' };
		expect(() =>
			authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)
		).toThrow(UnauthorizedError);
	});

	it('Should allow access with a valid Bearer Token regardless of Cases', async () => {
		const testToken = jwt.sign('testPayload', environment.secretKey);
		mockRequest.headers = { authorization: `Bearer ${testToken}` };
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
		expect(nextFunction).toBeCalled();
		mockRequest.headers = { authorization: `bearer ${testToken}` };
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
		expect(nextFunction).toBeCalled();
	});
});
