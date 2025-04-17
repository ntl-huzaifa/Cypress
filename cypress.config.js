const { defineConfig } = require('cypress');
const { Client } = require('pg'); // PostgreSQL client
const oracledb = require('oracledb'); // OracleDB client

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1400,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      on('task', {
        // PostgreSQL Query Handler
        async runPostgresQuery(query) {
          const client = new Client({
            user: 'esqateam',
            host: '172.16.179.43',
            database: 'ncrm',
            password: 'zvBfqdyDMKpRNvDHWoxX',
            port: 5432,
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

        // OracleDB Query Handler with Thick Mode
        async runOracleQuery(query) {
          let connection;

          try {
            // Enable Thick mode for Oracle Instant Client
            oracledb.initOracleClient({
              libDir: process.platform === 'win32'
                ? 'C:\\Oracle\\instantclient_19_26' // Make sure this path exists on your machine
                : '/opt/oracle/instantclient_19_11'  // For Linux/macOS
            });

            connection = await oracledb.getConnection({
              user: 'eshuzaifa',
              password: 'uyqxhrFzdETkBkrGzmYz',
              connectString: '172.16.37.130:1521/ntlbill',
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
