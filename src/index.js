import express from "express"
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from 'cors';
config();
import userRoutes from "./routers/user.routes.js";
import productRoutes from './routers/product.routes.js'
import categoryRoutes from './routers/category.routes.js'
import storageRoutes from './routers/storage.routes.js'

const app = express();  
const port = process.env.PORT || 7000;

app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', storageRoutes)

app.use((res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
  
app.get('/', (req,res) => {
    res.send('Welcome to my API');
});
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connect to MongoDB Altas"))
.catch((error)=>console.error(error));

app.listen(port,()=> console.log('server listening on port',port))