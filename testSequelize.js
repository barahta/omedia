const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
    config.get("DB_NAME"),
    config.get("DB_USER"),
    config.get("DB_PASSWORD"),
    {
        dialect: 'postgres',
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT")
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();