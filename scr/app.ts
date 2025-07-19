import express from "express"
import cors from 'cors';
import initRoi from "./routes/initRouter"
import {
  authRouter,
  adminRouter,
  categoryRouter,
  productRouter,
  userRouter,
  searchRouter,
  imageRouter,
  topItemRouter,
  playListRouter,
  basketRouter,
  favoriteRouter
} from './routes/index';


const app = express()

app.use(cors({
  origin: 'http://localhost:3000', // Указываем домен/порт фронтенда
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], // Разрешаем только GET и POST запросы (или другие методы, которые тебе нужны)
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешаем только заголовок Content-Type
}));

app.use(express.json());

app.use('/auth', authRouter)
app.use('/basket',basketRouter)
app.use('favorite',favoriteRouter)
app.use('/products', productRouter)
app.use('/category', categoryRouter)
app.use('/users', userRouter)
app.use('/admins', adminRouter)
app.use('/search', searchRouter)
app.use('/images', imageRouter)
app.use('/top-items', topItemRouter)
app.use('/play-list', playListRouter)
app.use('/init', initRoi)

export default app