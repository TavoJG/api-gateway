export default class InternalError extends Error {
	constructor(message: string | undefined) {
		super(message);
		this.name = 'InternalError';
	}
}
