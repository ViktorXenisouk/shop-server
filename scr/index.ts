import express from "express"
import mongoose from 'mongoose';
import { register,login,getMe } from "./controllers/UserController";
import { registerValidation,loginValidation } from "./validations/userValidations";
import { checkAuth } from "./utils/checkAuth";

const HOST = 'localhost'
const PORT = 4444

const app = express()

app.use(express.json());

mongoose.connect('mongodb://vikktorx2005:Kingpig2005@ac-7bxlhwo-shard-00-00.5dlv2wj.mongodb.net:27017,ac-7bxlhwo-shard-00-01.5dlv2wj.mongodb.net:27017,ac-7bxlhwo-shard-00-02.5dlv2wj.mongodb.net:27017/?replicaSet=atlas-9a26h4-shard-0&ssl=true&authSource=admin')
    .then(() =>{
        console.log('Data Base ok');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, (error) => {
    if(error){
        console.log(error);
        return;
    }

    console.log('server Ok');
    console.log(`conect on: http://${HOST}:${PORT}`)
});

app.post('/auth/register',registerValidation,register)
app.get('/auth/login',loginValidation,login)
app.get('/auth/getUser',checkAuth,getMe)


app.get('/products/*')
app.post('product/add')
app.get('product/update')

app.get('/catalog')

