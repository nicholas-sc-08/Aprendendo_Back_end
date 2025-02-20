async function connect() {

    const { Pool } = require(`pg`);
    const pool = new Pool({connectionString: process.env.CONNECTION_STRING}); //ler dados com a conexão com o banco
    const client = await pool.connect();
};