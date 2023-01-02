import cookieParser from 'cookie-parser'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './services/users/index.js'

const server = express() // inizzializzo il server con la libreria express
const whitelist = ["*",null] // imposto la whitelist per consentire il cross origin resource sharing a tutti gli indirizzi
const corsOptions = { // imposto le opzioni per il cors
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const port = process.env.PORT || 3001 // imposto la porta del server
// server.use(cors(corsOptions)) // abilito il cors con le opzioni impostate sopra per consentire il cross origin resource sharing 
server.use(cookieParser()) // abilito il cookie parser per leggere i cookie
server.use(express.json()) // abilito il json parser per leggere i json inviati dal client al server 
server.use('/api/users/', usersRouter) // abilito il router per gli utenti
console.table(listEndpoints(server)) // stampo tutti gli endpoint disponibili nel server
mongoose.set('strictQuery', true); // imposto la modalità strictQuery per evitare che vengano ignorati i parametri non previsti
mongoose.connect(process.env.MONGO_CONNECTION).then(

    server.listen(port, () => {
        console.log(`Server is running away from ${port} zombies`)
    })
).catch(err => console.log(err)

)