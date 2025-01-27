const express = require('express')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const app = express()
const PORT = config.get('serverPort')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorMiddlewere = require('./middlewere/error.middlewere')
const path = require("path");

app.use(fileUpload({}))

app.use(cors({
    origin: config.get('client_url'),
    credentials: true
}))
app.use('/files', express.static(config.get('file_path')));
app.use(cookieParser())
app.use(express.json({ extended: true,limit: '3mb' }))
app.use(express.urlencoded({ extended: true,limit: '3mb' }))
app.use('/api', router)


app.use('/media', express.static('/var/www/adminomedia/client/build/'));
app.use('/video', express.static('/home/www/adminomedia/client/build/videos/'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(errorMiddlewere) //Обязательно последний!

const start = async () => {
    try{
        app.listen(PORT,() => {
            console.log('Server started on port : ', PORT)
        })
        //await mailService.sendActivationMail('test@gmail.com','test!')
        await sequelize.authenticate()
        // await sequelize.sync({ alter: true })
        console.log('connect to DB')

    }catch (e){
        console.log(e)

    }
}

start()