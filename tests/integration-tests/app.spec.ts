import * as express from 'express';
import request from 'supertest';
import IntegrationHelpers from '../helpers/integration-helpers';

describe('status integration tests', () => {
	let app: express.Application;

	beforeAll(async () => {
		app = await IntegrationHelpers.getApp();
	});

	it('Should not allow access without Bearer token', async () => {
		await request(app).get('/').expect(403);
	});

	it('Should allow with Bearer token', async () => {
		const token = IntegrationHelpers.generateValidToken();
		await request(app).get('/fake-route').set('Authorization', `Bearer ${token}`).expect(404);
	});
	it('Should not allow access with invalid token', async () => {
		const badToken = 'fghjk';
		await request(app).get('/').set('Authorization', `Bearer ${badToken}`).expect(401);
		await request(app).get('/').set('Authorization', 'Token token').expect(403);
	});
});
