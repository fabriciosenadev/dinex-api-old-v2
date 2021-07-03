import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    // get info from ormconfig.json file
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? "./src/database/database.test.db"
                    : defaultOptions.database
        })
    );
}
