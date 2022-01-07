import fs from 'fs';
import * as path from 'path';
import RouteConfig from '../modules/service_routes/interfaces';

const rootDir: string = path.resolve(__dirname, '../../');

const configDir = `${rootDir}/config`;

const configFileLoader = (): RouteConfig[] => {
	const configFile = fs.readFileSync(`${configDir}/routes_config.json`, 'utf8');
	return JSON.parse(configFile) as RouteConfig[];
};

export default configFileLoader;
