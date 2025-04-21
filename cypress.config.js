const { defineConfig } = require('cypress');
const { Client } = require('pg'); // PostgreSQL client
const oracledb = require('oracledb'); // OracleDB client
require('dotenv').config(); // Load variables from .env

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1400,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      on('task', {
        // PostgreSQL Query Handler
        async runPostgresQuery(query) {
          const client = new Client({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: parseInt(process.env.PG_PORT),
          });

          try {
            await client.connect();
            console.log('✅ Connected to PostgreSQL');
            const result = await client.query(query);
            return result.rows;
          } catch (err) {
            console.error('❌ PostgreSQL Error:', err);
            throw err;
          } finally {
            await client.end();
            console.log('🔒 PostgreSQL connection closed');
          }
        },

        // OracleDB Query Handler
        async runOracleQuery(query) {
          let connection;

          try {
            oracledb.initOracleClient({
              libDir: process.platform === 'win32'
                ? process.env.ORACLE_LIB_DIR_WIN
                : process.env.ORACLE_LIB_DIR_UNIX
            });

            connection = await oracledb.getConnection({
              user: process.env.ORACLE_USER,
              password: process.env.ORACLE_PASSWORD,
              connectString: process.env.ORACLE_CONNECT_STRING,
            });

            console.log('✅ Connected to OracleDB');
            const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
            return result.rows;
          } catch (err) {
            console.error('❌ OracleDB Error:', err);
            throw err;
          } finally {
            if (connection) {
              try {
                await connection.close();
                console.log('🔒 Oracle connection closed');
              } catch (err) {
                console.error('❌ Error closing Oracle connection:', err);
              }
            }
          }
        }
      });

      return config;
    },
  },
});
