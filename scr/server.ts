import mongoose from 'mongoose';
import app from "./app";

const HOST = 'localhost'
const PORT = 4444

const uri = "mongodb+srv://king:Kingpig2005@cluster0.5dlv2wj.mongodb.net/?appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log('Data Base ok');
    });

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('server Ok');
    console.log(`conect on: http://${HOST}:${PORT}`)
})