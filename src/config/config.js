require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
            return{
                bd_string: process.env.bd_string,
                jwt_pass: process.env.jwt_pass,
                jwt_expires_in: '7d'
            }
        case 'hml':
            return{
                bd_string: process.env.bd_string,
                jwt_pass: process.env.jwt_pass,
                jwt_expires_in: '7d'
            }
        case 'prd':
            return{
                bd_string: process.env.bd_string,
                jwt_pass: process.env.jwt_pass,
                jwt_expires_in: '7d'
            }
    }
}

console.log(`Iniciando a API em ambiente de ${env.toUpperCase()}`)

module.exports = config();