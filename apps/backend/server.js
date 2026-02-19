import app from './app.js';
import connectDB from './config/database.js';
// import { env } from './config/env.js';

await connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running");
});


//Funções app.js

 //Cria a instância do express
 //Configura middlewares,
 //configura rotas