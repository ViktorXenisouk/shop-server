import express from "express"
import cors from 'cors';
import {authRouter,productsRouter,categoryRouter,usersRouter,adminsRouter} from './routes/index';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // Указываем домен/порт фронтенда
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Разрешаем только GET и POST запросы (или другие методы, которые тебе нужны)
    allowedHeaders: ['Content-Type','Authorization'], // Разрешаем только заголовок Content-Type
  }));

app.use(express.json());

app.use('/auth',authRouter)
app.use('/products',productsRouter)
app.use('/category',categoryRouter)
app.use('/users',usersRouter)
app.use('/admins',adminsRouter)


export default app