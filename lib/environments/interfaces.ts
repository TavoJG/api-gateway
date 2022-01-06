interface IEnvironment {
	env: string;
	port: number;
	secretKey: string;
	isProductionEnvironment: boolean;
	isDevEnvironment: boolean;
	isTestEnvironment: boolean;
	isLocalEnvironment: boolean;
}

export default IEnvironment;
