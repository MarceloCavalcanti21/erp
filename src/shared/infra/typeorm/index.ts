import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = 'erp_database'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
};