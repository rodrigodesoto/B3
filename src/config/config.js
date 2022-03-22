require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
            return{
                bd_string: 'mongodb://127.0.0.1:27017/B3',
                jwt_pass: 'batata',
                jwt_expires_in: '7d'
            }
        case 'hml':
            return{
                bd_string: 'mongodb://127.0.0.1:27017/B3',
                jwt_pass: 'batata',
                jwt_expires_in: '7d'
            }
        case 'prd':
            return{
                bd_string: 'mongodb://127.0.0.1:27017/B3',
                jwt_pass: 'batata',
                jwt_expires_in: '7d'
            }
    }
}

console.log(`Iniciando a API em ambiente de ${env.toUpperCase()}`)

module.exports = config();