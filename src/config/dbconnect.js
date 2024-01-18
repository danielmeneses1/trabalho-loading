import mongoose from "mongoose";

async function conectaNaDatabase(){
    mongoose.connect("mongodb+srv://admin:admin@cluster0.ppo3xsa.mongodb.net/livraria?retryWrites=true&w=majority")

    return mongoose.connection;
}


export default conectaNaDatabase;
