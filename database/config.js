const { config } = require("dotenv");
config();

module.exports = {
    db: {
        user: 'root',
        password: 'root',
        host: 'localhost',
        port: 5432,
        database: 'cebe',
    }
}

