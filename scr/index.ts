import express from "express"
import mongoose from 'mongoose';
import { checkAuth } from "./utils/checkAuth";
import { checkIsAdminLvl1,checkIsAdminLvl2,checkIsAdminLvl3 } from "./utils/checkAdmin";
import {AdminValidations,CatalogValidations,ProductValidations,UserValidations} from "./validations/index"
import {AdminController,CatalogController,ProductController,UserController} from "./controllers/index"


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

//login reservation logic
app.post('/auth/register', UserValidations.register, UserController.register)
app.get('/auth/login', UserValidations.login, UserController.login)
app.get('/auth/getUser', checkAuth, UserController.getMe)
// public API
app.get('/products/search',ProductController.search)
app.get('/products/:id',ProductController.getProductById)
app.get('/category',CatalogController.get)

//user logic
app.get('/user/edit',UserValidations.editMe,checkAuth,UserController.editMe)

// admin login
app.get('/admin/login',AdminValidations.login,AdminController.login);

//admin LVL=1
app.get('/admin/category/create',checkIsAdminLvl1,CatalogValidations.create,)
app.get('/admin/category/edit',checkIsAdminLvl1,CatalogValidations.edit,)
app.get('/admin/category/remove',checkIsAdminLvl1,CatalogValidations.remove,)

//admin LVL=1
app.get('/admin/products/create',checkIsAdminLvl1,ProductValidations.create, ProductController.create)
app.get('/admin/products/edit',checkIsAdminLvl1,ProductValidations.edit,ProductController.edit,checkIsAdminLvl1)
app.get('/admin/products/remove',checkIsAdminLvl1,ProductValidations.remove,ProductController.remove)

//admin LVL=2
app.get('/admin/users/block',UserValidations.block,UserController.setIsBlocked)
app.get('/admin/users/remove',checkIsAdminLvl2,UserController.remove)
app.get('/admin/users/edit',checkIsAdminLvl2,ProductValidations.edit,UserController.edit)

//admin LVL=3
app.get('/admin/admins/create',checkIsAdminLvl3,AdminValidations.create,AdminController.create)
app.get('/admin/admins/remove',checkIsAdminLvl3,AdminValidations.remove,AdminController.remove)
app.get('/admin/admins/edit',checkIsAdminLvl3,AdminController.editMe)
