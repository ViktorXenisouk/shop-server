import express from "express"
import mongoose from 'mongoose';
import * as UserController from "./controllers/UserController";
import { registerValidation, loginValidation } from "./validations/userValidations";
import * as ProductController from "./controllers/ProductController"
import { checkAuth } from "./utils/checkAuth";
import * as ProductValidator from './validations/productValidations';

const HOST = 'localhost'
const PORT = 4444

const app = express()

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

app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/login', loginValidation, UserController.login)
app.get('/auth/getUser', checkAuth, UserController.getMe)

app.get('/products/*')
app.post('/product/add',ProductValidator.addValidation, ProductController.add)
app.patch('/product/update',ProductController.update)

app.get('/catalog')

