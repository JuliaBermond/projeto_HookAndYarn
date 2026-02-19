import mongoose from 'mongoose';

//CONEXÃO COM O BANCO DE DADOS - MONGODB
async function connectDB(){
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected!')
    }catch(err){
        console.log(err)
    }
}

export default connectDB;


