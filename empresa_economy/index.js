//instalar comando//  npm install --save express nodemon moment uuid axios chalk@4.1.0
// para el email // npm install --save nodemailer  
const express = require('express');
const axios = require('axios');
const send_email = require('./email.js');
const uuid = require('uuid');

const fs = require('fs').promises;


const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const email = [];

app.post('/mailing', async (req, res) => {
    const correo = req.body.correos;
    const asunto = req.body.asunto;
    console.log(req.body.asunto);
    console.log(req.body.contenido);
    const id = `correos/${uuid.v4()}.txt`;

    let texto = await texto_correo(req.body.contenido);
    send_email(correo, asunto, texto);

    await fs.writeFile(id, texto, 'utf-8')
    res.send('Email enviado!')
});
 //sacamos el valor del dolar de mindicador.cl/api junto con las demas monedas
async function texto_correo(contenido) {
    const { data } = await axios.get('https://mindicador.cl/api')
    const dolar = data.dolar.valor;
    const euro = data.euro.valor;
    const uf = data.uf.valor;
    const utm = data.utm.valor;
    const texto = `${contenido}
        
		El valor del dolar el dia de hoy es: ${dolar} <br>
		El valor del euro el dia de hoy es: ${euro} <br>
		El valor del UF el dia de hoy es: ${uf} <br>
		El valor del UTM el dia de hoy es: ${utm} <br>`
        

    return texto;
}

    texto_correo()
    app.post('/email', async (req, res) => {
        res.send('hola')

    });

    app.listen(3000, () => console.log('ejecutando en puerto 3000'));