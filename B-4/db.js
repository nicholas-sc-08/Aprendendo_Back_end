async function connect() {

    if(global.connection){

        return global.connection.connect();
    };

    const { Pool } = require(`pg`);
    const pool = new Pool({connectionString: process.env.CONNECTION_STRING}); //ler dados com a conexão com o banco
    const cliente = await pool.connect();

    const res = await cliente.query(`select now()`);
    console.log(res.rows[0]);
    
    cliente.release();
    global.connetion = pool;
    
    return pool.connect();
};
connect();

//listagem de usuarios

async function selecionar_usuarios(){

    try {
        
        const cliente = await connect;
        const res = await cliente.query(`SELECT * FROM USUARIOS`);
        return res.rows;

    } catch (error) {
        
    }
};

module.exports = {

    selecionar_usuarios
};