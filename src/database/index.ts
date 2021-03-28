//import { createConnection } from "typeorm";
//createConnection();
//26/03/2021

import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            database:
            process.env.NODE_ENV === 'test'
            ? "./src/database/database.test.sqlite"
            : defaultOptions.database,
        })
    );
};


