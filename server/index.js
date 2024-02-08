import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routers/image_router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))
app.use(router)

app.listen(3001, () => console.log('Run...'))