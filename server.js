const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
require('./models/Doador')
const Doador = mongoose.model('doadores')

//configurando body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//consigurando handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//adicionando pasta public
app.use(express.static(path.join(__dirname, 'public')))

//configurando mongose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/maratonadev', {
    useunifiedTopology: true
}).then(() => {
    console.log('conectado com sucesso ao mongoDB')
}).catch((erro) => {
    console.log('erro ao se conectar ao Mongo: ' + erro)
})

//add Rotas
app.get('/', (req, res) => {
    //res.render('home/home')
    Doador.find().lean().then((doadores)=>{
        res.render('home/home', {doadores: doadores})
    }).catch((err)=>{
        res.send('erro: ' + err)
    })
})
app.post('/add', (req, res) => {
    // res.send('nome:' + req.body.name + 'email:' + req.body.email + 'sangue: ' + req.body.tipoSangue)
    const novoDoador = {
        name: req.body.name,
        email: req.body.email,
        blood: req.body.blood
    }
    new Doador(novoDoador).save().then(() => {
        res.send('enviado com sucesso')
    }).catch((err) => {
        res.send('error: ' + err)
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log('SERVIDOR INICIADO!')
    console.log(`http://localhost:${PORT}`)
    console.log('BREAK SERVER CRTL + C')
})