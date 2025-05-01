import express from "express"
import mongoose from 'mongoose';
import { checkAuth } from "./utils/checkAuth";
import { checkIsAdminLvl1,checkIsAdminLvl2,checkIsAdminLvl3 } from "./utils/checkAdmin";
import {AdminValidations,CatalogValidations,ProductValidations,UserValidations,idValidation,editIdArray} from "./validations/index"
import {validateRequest} from "./utils/validateRequest"
import {AdminController,CatalogController,ProductController,UserController,AuthUsersController} from "./controllers/index"
import cors from 'cors';

const HOST = 'localhost'
const PORT = 4444

const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // Указываем домен/порт фронтенда
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Разрешаем только GET и POST запросы (или другие методы, которые тебе нужны)
    allowedHeaders: ['Content-Type','Authorization'], // Разрешаем только заголовок Content-Type
  }));

app.use(express.json());
const uri = "mongodb+srv://king:Kingpig2005@cluster0.5dlv2wj.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log('Data Base ok');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log('server Ok');
    console.log(`conect on: http://${HOST}:${PORT}`)
});

//auth  logic
app.post('/auth/register', UserValidations.register,validateRequest, UserController.register)
app.post('/auth/login', UserValidations.login,validateRequest, UserController.login)
app.get('/auth/getUser', checkAuth, UserController.getMe)
// public API
app.get('/products/search',ProductValidations.search,validateRequest,ProductController.search)
app.get('/products/:id',idValidation,validateRequest,ProductController.getProductById)
app.get('/category',CatalogController.get)

// public api for auth users

app.get('/user/basket',checkAuth,AuthUsersController.getBasket)
app.get('/user/favourite',checkAuth,AuthUsersController.getFavourite)
app.patch('/user/basket',editIdArray,validateRequest,checkAuth,AuthUsersController.setBasket)
app.patch('/user/favourite',editIdArray,validateRequest,checkAuth,AuthUsersController.setFavourite)

//user logic
app.patch('/user/edit',UserValidations.editMe,validateRequest,checkAuth,UserController.editMe)

// admin auth
app.post('/admin/login',AdminValidations.login,validateRequest,AdminController.login);
app.get('/admin/getAdmin',checkIsAdminLvl1,validateRequest,AdminController.getMe);

//admin LVL=1
app.post('/admin/category/create',checkIsAdminLvl1,CatalogValidations.create,validateRequest,CatalogController.create)
app.patch('/admin/category/edit',checkIsAdminLvl1,CatalogValidations.edit,validateRequest,)
app.delete('/admin/category/remove/:id',checkIsAdminLvl1,idValidation,validateRequest,)

//admin LVL=1
app.post('/admin/products/create',checkIsAdminLvl1,ProductValidations.create,validateRequest, ProductController.create)
app.patch('/admin/products/edit',checkIsAdminLvl1,ProductValidations.edit,validateRequest,ProductController.edit)
app.delete('/admin/products/remove/:id',checkIsAdminLvl1,idValidation,validateRequest,ProductController.remove)

//admin LVL=2
app.get('/admin/users',checkIsAdminLvl2,UserController.getAll)
app.patch('/admin/users/block',checkIsAdminLvl2,UserValidations.block,validateRequest,UserController.setIsBlocked)
app.delete('/admin/users/remove/:id',checkIsAdminLvl2,idValidation,validateRequest,UserController.remove)
app.patch('/admin/users/edit',checkIsAdminLvl2,ProductValidations.edit,validateRequest,UserController.edit)

//admin LVL=3
app.post('/admin/admins/create',checkIsAdminLvl3,AdminValidations.create,validateRequest,AdminController.create)
app.delete('/admin/admins/remove/:id',checkIsAdminLvl3,idValidation,validateRequest,AdminController.remove)
app.patch('/admin/admins/edit',checkIsAdminLvl3,validateRequest,AdminController.editMe)
