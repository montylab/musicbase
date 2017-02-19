"use strict";
module.exports = {
    development: {
        //url to be used in link generation
        url: 'http://localhost:3000/',
        //mongodb connection settings
        database: {
            user: "kjleuxtkayagpa",
            password: "478c4edebce53c1c18db1e7d6f5e0f9c1fcd65869e526928361a7307844eb404",
            database: "d7581ld5q9md57",
            port: 5432,
            host: "ec2-54-247-189-141.eu-west-1.compute.amazonaws.com",
            ssl: true
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://monty-music.heroku.com/',
        //mongodb connection settings
        database: {
            user: "kjleuxtkayagpa",
            password: "478c4edebce53c1c18db1e7d6f5e0f9c1fcd65869e526928361a7307844eb404",
            database: "d7581ld5q9md57",
            port: 5432,
            host: "ec2-54-247-189-141.eu-west-1.compute.amazonaws.com",
            ssl: true
        },
        //server details
        server: {
            host: 'http://monty-music.heroku.com/',
            port: ''
        }
    }
};
//# sourceMappingURL=config.js.map