import * as express from 'express';
import jwt from 'jsonwebtoken';
import App from '../../lib/app';
import environment from '../../lib/environments';

export default class IntegrationHelpers {
	public static appInstance: express.Application;

	public static async getApp(): Promise<express.Application> {
		if (this.appInstance) {
			return this.appInstance;
		}

		const { app } = new App();
		this.appInstance = app;

		return this.appInstance;
	}

	public static generateValidToken(): string {
		return jwt.sign('payload', environment.secretKey);
	}
}
